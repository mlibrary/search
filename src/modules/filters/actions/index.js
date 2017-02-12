export const ADD_FILTER = 'filters/ADD_FILTER';
export const SET_ACTIVE_FILTERS = 'filters/SET_ACTIVE_FILTERS';
export const CLEAR_FILTERS = 'filters/CLEAR_FILTERS';
export const CLEAR_ACTIVE_FILTERS = 'filters/CLEAR_ACTIVE_FILTERS';

export const addFilter = function addFilter(payload) {
  return { type: ADD_FILTER, payload };
};

export const setActiveFilters = function setActiveFilters(payload) {
  return { type: SET_ACTIVE_FILTERS, payload };
};

export const clearFilters = function clearFilters(payload) {
  return { type: CLEAR_FILTERS, payload };
};

export const clearActiveFilters = function clearActiveFilters(payload) {
  return { type: CLEAR_ACTIVE_FILTERS, payload };
};
