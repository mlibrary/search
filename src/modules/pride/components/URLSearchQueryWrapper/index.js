import { useEffect, memo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../../../config';
import {
  setSearchQuery,
  setSearchQueryInput,
  searching,
  setPage,
  setSort,
  setParserMessage
} from '../../../search/actions';
import {
  resetFilters,
  setActiveFilters,
  clearActiveFilters
} from '../../../filters';
import {
  getStateFromURL,
  runSearch,
  switchPrideToDatastore,
  getDatastoreUidBySlug
} from '../../../pride';
import { setActiveInstitution } from '../../../institution';
import { setA11yMessage } from '../../../a11y';
import { affiliationCookieSetter, setActiveAffiliation } from '../../../affiliation';
import PropTypes from 'prop-types';

function handleURLState ({
  datastoreUid,
  query,
  page,
  activeFilters,
  sort,
  location,
  institution
}, dispatch) {
  const urlState = getStateFromURL({ location });

  dispatch(setActiveAffiliation(urlState.affiliation));
  affiliationCookieSetter(urlState.affiliation);

  if (!datastoreUid) return null;

  const updateRequired = {
    query: urlState.query && urlState.query !== query,
    filters: JSON.stringify(urlState.filter) !== JSON.stringify(activeFilters),
    page: parseInt(urlState.page, 10) !== page,
    sort: urlState.sort !== sort,
    institution: urlState.library && urlState.library !== institution.active
  };

  // Run search and apply updates based on changes
  if (Object.values(updateRequired).some(Boolean)) {
    if (updateRequired.query) {
      const newQuery = urlState.query || '';
      dispatch(setSearchQuery(newQuery));
      dispatch(setSearchQueryInput(newQuery));
    }

    if (updateRequired.filters) {
      const actionProps = {
        datastoreUid,
        filters: urlState.filter || null
      };
      dispatch(urlState.filter ? setActiveFilters(actionProps) : clearActiveFilters(actionProps));
    }

    if (updateRequired.page) {
      dispatch(setPage({
        page: urlState.page ? parseInt(urlState.page, 10) : 1,
        datastoreUid
      }));
    }

    if (updateRequired.sort) {
      dispatch(setSort({
        sort: urlState.sort || config.sorts[datastoreUid].default,
        datastoreUid
      }));
    }

    if (updateRequired.institution) {
      dispatch(setActiveInstitution(urlState.library));
    }

    dispatch(setA11yMessage('Search modified.'));
    dispatch(setParserMessage(null));
    runSearch();
  }

  // If URL does not have a state, reset the filters and the query
  if (!Object.keys(urlState).length) {
    dispatch(resetFilters());
    dispatch(setSearchQuery(''));
  }

  // Decide if the UI should be in a "Searching" state based on URL having query or filter
  dispatch(searching(Boolean(urlState.query || urlState.filter)));
}

const URLSearchQueryWrapper = (props) => {
  const dispatch = useDispatch();
  const {
    match,
    isSearching,
    query,
    activeFilters,
    location,
    page,
    sort,
    institution,
    children
  } = props;
  useEffect(() => {
    const datastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug);
    switchPrideToDatastore(datastoreUid);

    handleURLState({
      isSearching,
      query,
      activeFilters: activeFilters[datastoreUid],
      location,
      datastoreUid,
      page: page[datastoreUid],
      sort: sort[datastoreUid],
      institution
    }, dispatch);
  }, [match.params.datastoreSlug, isSearching, query, location.pathname, activeFilters, location, page, sort, institution, dispatch]);

  return children;
};

URLSearchQueryWrapper.propTypes = {
  match: PropTypes.object,
  datastoreUid: PropTypes.string,
  isSearching: PropTypes.bool,
  query: PropTypes.string,
  activeFilters: PropTypes.object,
  location: PropTypes.object,
  page: PropTypes.object,
  sort: PropTypes.object,
  institution: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const mapStateToProps = (state) => {
  return {
    query: state.search.query,
    page: state.search.page,
    activeFilters: state.filters.active,
    location: state.router.location,
    datastoreUid: state.datastores.active,
    isSearching: state.search.searching,
    institution: state.institution,
    sort: state.search.sort
  };
};

const mapDispatchToProps = {
  setSearchQuery,
  setSearchQueryInput,
  setActiveFilters,
  clearActiveFilters,
  resetFilters,
  searching,
  setPage,
  setSort,
  setActiveInstitution,
  setA11yMessage,
  setParserMessage,
  setActiveAffiliation
};

function getURLPath (props) {
  return props.location.pathname + props.location.search;
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(URLSearchQueryWrapper, (prevProps, nextProps) => {
  return getURLPath(nextProps) === getURLPath(prevProps);
})));
