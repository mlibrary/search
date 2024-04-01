import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
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
import { setActiveAffiliation } from '../../../affiliation';
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
  if (urlState.affiliation) {
    localStorage.setItem('affiliation', urlState.affiliation);
  }

  if (!datastoreUid) return null;

  const updateRequired = {
    query: urlState.query && urlState.query !== query,
    filters: JSON.stringify(urlState.filter) !== JSON.stringify(activeFilters),
    page: parseInt(urlState.page, 10) !== (page || 1),
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

const URLSearchQueryWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const datastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const query = useSelector((state) => {
    return state.search.query;
  });
  const page = useSelector((state) => {
    return state.search.page[datastoreUid];
  });
  const activeFilters = useSelector((state) => {
    return state.filters.active[datastoreUid];
  });
  const isSearching = useSelector((state) => {
    return state.search.searching;
  });
  const sort = useSelector((state) => {
    return state.search.sort[datastoreUid];
  });
  const institution = useSelector((state) => {
    return state.institution;
  });

  useEffect(() => {
    const datastoreUid = getDatastoreUidBySlug(params.datastoreSlug);
    switchPrideToDatastore(datastoreUid);

    handleURLState({
      isSearching,
      query,
      activeFilters,
      location,
      datastoreUid,
      page,
      sort,
      institution
    }, dispatch);
  }, [params.datastoreSlug, isSearching, query, activeFilters, location, page, sort, institution, dispatch]);

  return children;
};

URLSearchQueryWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default memo(URLSearchQueryWrapper);
