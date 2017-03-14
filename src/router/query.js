import { _ } from 'underscore';

import { store } from '../store';
import { setSearchQuery } from '../modules/search';
import {
  setActiveFilters,
  clearActiveFilters,
} from '../modules/filters';

const handleSearchQuery = ({ nextQuery, query }) => {
  if ((nextQuery !== query)) {
    store.dispatch(setSearchQuery(nextQuery || ''));

    if (nextQuery) {
      return true;
    }
  }

  return false;
}

const getActiveFiltersByQuery = (query) => {
  //TODO clear out undefined(s)

  const groups = query.split(';');
  const activeFilters = groups.reduce((map, array) => {
    const split = array.split(':');
    map[split[0]] = split[1]
    return map
  }, {})

  return activeFilters;
}

const handleFilterQuery = ({ activeDatastoreUid, activeFiltersFromState, filterQuery }) => {
  if (filterQuery) {
    const filtersFromQuery = getActiveFiltersByQuery(filterQuery);

    // If filters in URL are not in state, then add them.
    if (!_.isEqual(filtersFromQuery, activeFiltersFromState)) {
      store.dispatch(clearActiveFilters({
        activeDatastore: activeDatastoreUid
      }));
      store.dispatch(setActiveFilters({
        datastore: activeDatastoreUid,
        active: filtersFromQuery
      }));

      return true;
    }
  }

  // No filters in URL, but filters are active in state,
  // then clear state filters.
  if (activeFiltersFromState[activeDatastoreUid]) {
    store.dispatch(clearActiveFilters({
      activeDatastore: activeDatastoreUid
    }));
    return true;
  }


  return false;
}

export {
  handleSearchQuery,
  handleFilterQuery,
}
