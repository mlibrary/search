import {
  clearActiveFilters,
  resetFilters,
  setActiveFilters
} from '../../../filters';
import {
  getDatastoreUidBySlug,
  runSearch,
  switchPrideToDatastore
} from '../../../pride';
import { memo, React, useEffect, useMemo } from 'react';
import {
  searching,
  setPage,
  setParserMessage,
  setSearchQuery,
  setSearchQueryInput,
  setSort
} from '../../../search/actions';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../../../config';
import { DatastorePage } from '../../../pages';
import { setA11yMessage } from '../../../a11y';
import { setActiveAffiliation } from '../../../affiliation';
import { setActiveInstitution } from '../../../institution';

const handleURLState = ({
  activeFilters,
  datastoreUid,
  institution,
  page,
  query,
  sort,
  urlState
}, dispatch) => {
  const {
    affiliation: stateAffiliation,
    filter: stateFilter,
    library: stateLibrary,
    page: statePage,
    query: stateQuery,
    sort: stateSort
  } = urlState;

  if (stateAffiliation) {
    dispatch(setActiveAffiliation(stateAffiliation));
    localStorage.setItem('affiliation', stateAffiliation);
  }

  if (!datastoreUid) {
    return;
  }

  const updateRequired = {
    filters: JSON.stringify(stateFilter) !== JSON.stringify(activeFilters),
    institution: stateLibrary && stateLibrary !== institution.active,
    page: (statePage ? parseInt(statePage, 10) : 1) !== (page || 1),
    query: stateQuery && stateQuery !== query,
    sort: stateSort !== sort
  };

  // If URL has a state, apply updates based on changes
  if (Object.keys(urlState).length) {
    if (updateRequired.query) {
      const newQuery = stateQuery || '';
      dispatch(setSearchQuery(newQuery));
      dispatch(setSearchQueryInput(newQuery));
    }

    if (updateRequired.filters) {
      dispatch(stateFilter
        ? setActiveFilters({ datastoreUid, filters: stateFilter })
        : clearActiveFilters({ datastoreUid }));
    }

    if (updateRequired.page) {
      dispatch(setPage({
        datastoreUid,
        page: statePage ? parseInt(statePage, 10) : 1
      }));
    }

    if (updateRequired.sort) {
      dispatch(setSort({
        datastoreUid,
        sort: stateSort || config.sorts[datastoreUid].default
      }));
    }

    if (updateRequired.institution) {
      dispatch(setActiveInstitution(stateLibrary));
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
  dispatch(searching(Boolean(stateQuery || stateFilter)));
};

const URLSearchQueryWrapper = ({ datastoreSlug, urlState }) => {
  const dispatch = useDispatch();
  const { active: currentDatastore } = useSelector((state) => {
    return state.datastores;
  });
  const { [currentDatastore]: activeFilters } = useSelector((state) => {
    return state.filters.active;
  });
  const institution = useSelector((state) => {
    return state.institution;
  });
  const { query, page: currentPage, sort: currentSort } = useSelector((state) => {
    return state.search;
  });
  const page = currentPage[currentDatastore];
  const sort = currentSort[currentDatastore];

  const datastoreUid = useMemo(() => {
    return getDatastoreUidBySlug(datastoreSlug);
  }, [datastoreSlug]);

  useEffect(() => {
    switchPrideToDatastore(datastoreUid);

    handleURLState({
      activeFilters,
      datastoreUid,
      institution,
      page,
      query,
      sort,
      urlState
    }, dispatch);
  }, [datastoreUid, activeFilters, institution, page, query, sort, urlState, dispatch]);

  return <DatastorePage {...{ currentDatastore, datastoreSlug, query }} />;
};

export default memo(URLSearchQueryWrapper);
