export const ADD_FILTERS = 'filters/ADD_FILTERS'
export const CLEAR_FILTERS = 'filters/CLEAR_FILTERS'
export const SET_ACTIVE_FILTERS = 'filters/SET_ACTIVE_FILTERS'
export const CLEAR_ACTIVE_FILTERS = 'filters/CLEAR_ACTIVE_FILTERS'
export const OPEN_FILTER = 'filters/OPEN_FILTER'
export const RESET_FILTERS = 'filters/RESET_FILTERS'

export const addFilters = function addFilters(payload) {
  return { type: ADD_FILTERS, payload };
};

export const clearFilters = function clearFilters(payload) {
  return { type: CLEAR_FILTERS, payload };
};

export const setActiveFilters = function setActiveFilters(payload) {
  return { type: SET_ACTIVE_FILTERS, payload };
};

export const clearActiveFilters = function clearActiveFilters(payload) {
  return { type: CLEAR_ACTIVE_FILTERS, payload };
};

export const resetFilters = function resetFilters() {
  return { type: RESET_FILTERS }
}