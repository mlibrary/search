export const ADD_FILTER = 'ADD_FILTER';
export const TOGGLE_ACTIVE_FILTER = 'TOGGLE_ACTIVE_FILTER';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
export const CLEAR_ACTIVE_FILTERS = 'CLEAR_ACTIVE_FILTERS';

export const addFilter = function addFilter(payload) {
  return { type: ADD_FILTER, payload };
};

export const toggleActiveFilter = function toggleActiveFilter(payload) {
  return { type: TOGGLE_ACTIVE_FILTER, payload };
};

export const clearFilters = function clearFilters(payload) {
  return { type: CLEAR_FILTERS, payload };
};

export const clearActiveFilters = function clearActiveFilters(payload) {
  return { type: CLEAR_ACTIVE_FILTERS, payload };
};
