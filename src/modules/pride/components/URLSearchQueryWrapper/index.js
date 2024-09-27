import {
  clearActiveFilters,
  resetFilters,
  setActiveFilters
} from '../../../filters';
import {
  getDatastoreUidBySlug,
  getStateFromURL,
  runSearch,
  switchPrideToDatastore
} from '../../../pride';
import { memo, useEffect, useMemo } from 'react';
import {
  searching,
  setPage,
  setParserMessage,
  setSearchQuery,
  setSearchQueryInput,
  setSort
} from '../../../search/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import config from '../../../../config';
import PropTypes from 'prop-types';
import { setA11yMessage } from '../../../a11y';
import { setActiveAffiliation } from '../../../affiliation';
import { setActiveInstitution } from '../../../institution';

const handleURLState = ({
  activeFilters,
  datastoreUid,
  institution,
  location,
  page,
  query,
  sort
}, dispatch) => {
  const urlState = getStateFromURL({ location });

  dispatch(setActiveAffiliation(urlState.affiliation));
  if (urlState.affiliation) {
    localStorage.setItem('affiliation', urlState.affiliation);
  }

  if (!datastoreUid) {
    return;
  }

  const updateRequired = {
    filters: JSON.stringify(urlState.filter) !== JSON.stringify(activeFilters),
    institution: urlState.library && urlState.library !== institution.active,
    page: parseInt(urlState.page, 10) !== (page || 1),
    query: urlState.query && urlState.query !== query,
    sort: urlState.sort !== sort
  };

  // If URL has a state, apply updates based on changes
  if (Object.keys(urlState).length) {
    if (updateRequired.query) {
      const newQuery = urlState.query || '';
      dispatch(setSearchQuery(newQuery));
      dispatch(setSearchQueryInput(newQuery));
    }

    if (updateRequired.filters) {
      dispatch(urlState.filter
        ? setActiveFilters({ datastoreUid, filters: urlState.filter })
        : clearActiveFilters({ datastoreUid }));
    }

    if (updateRequired.page) {
      dispatch(setPage({
        datastoreUid,
        page: urlState.page ? parseInt(urlState.page, 10) : 1
      }));
    }

    if (updateRequired.sort) {
      dispatch(setSort({
        datastoreUid,
        sort: urlState.sort || config.sorts[datastoreUid].default
      }));
    }

    if (updateRequired.institution) {
      dispatch(setActiveInstitution(urlState.library));
    }

    // Run search if any updates are true
    if (Object.values(updateRequired).some(Boolean)) {
      dispatch(setA11yMessage('Search modified.'));
      dispatch(setParserMessage(null));
      runSearch();
    }
  // If URL does not have a state, reset the filters and the query
  } else {
    dispatch(resetFilters());
    dispatch(setSearchQuery(''));
  }

  // Decide if the UI should be in a "Searching" state based on URL having query or filter
  dispatch(searching(Boolean(urlState.query || urlState.filter)));
};

const URLSearchQueryWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { active: activeDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const activeFilters = useSelector((state) => {
    return state.filters.active[activeDatastore];
  });
  const institution = useSelector((state) => {
    return state.institution;
  });
  const { query } = useSelector((state) => {
    return state.search;
  });
  const page = useSelector((state) => {
    return state.search.page[activeDatastore];
  });
  const sort = useSelector((state) => {
    return state.search.sort[activeDatastore];
  });

  const datastoreUid = useMemo(() => {
    return getDatastoreUidBySlug(params.datastoreSlug);
  }, [params.datastoreSlug]);

  useEffect(() => {
    switchPrideToDatastore(datastoreUid);

    handleURLState({
      activeFilters,
      datastoreUid,
      institution,
      location,
      page,
      query,
      sort
    }, dispatch);
  }, [params.datastoreSlug, query, activeFilters, location, page, sort, institution, dispatch]);

  return children;
};

URLSearchQueryWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default memo(URLSearchQueryWrapper);
