export const ADD_FILTER = 'filters/ADD_FILTER';
export const CLEAR_FILTERS = 'filters/CLEAR_FILTERS';

export const ADD_ACTIVE_FILTER = 'filters/ADD_ACTIVE_FILTER';
export const REMOVE_ACTIVE_FILTER = 'filters/REMOVE_ACTIVE_FILTER';
export const CLEAR_ACTIVE_FILTERS = 'filters/CLEAR_ACTIVE_FILTERS';

export const CLEAR_ALL_FILTERS = 'filters/CLEAR_ALL_FILTERS'

export const addFilter = function addFilter(payload) {
  return { type: ADD_FILTER, payload };
};

export const clearFilters = function clearFilters(payload) {
  return { type: CLEAR_FILTERS, payload };
};

export const addActiveFilter = function addActiveFilter(payload) {
  return { type: ADD_ACTIVE_FILTER, payload };
};

export const removeActiveFilter = function removeActiveFilter(payload) {
  return { type: REMOVE_ACTIVE_FILTER, payload };
};

export const clearActiveFilters = function clearActiveFilters(payload) {
  return { type: CLEAR_ACTIVE_FILTERS, payload };
};

export const clearAllFilters = function clearAllFilters(payload) {
  return { type: CLEAR_ALL_FILTERS, payload };
};
