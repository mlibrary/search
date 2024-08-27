export const ADD_FILTERS = 'filters/ADD_FILTERS';
export const CLEAR_ACTIVE_FILTERS = 'filters/CLEAR_ACTIVE_FILTERS';
export const CLEAR_FILTERS = 'filters/CLEAR_FILTERS';
export const OPEN_FILTER = 'filters/OPEN_FILTER';
export const RESET_FILTERS = 'filters/RESET_FILTERS';
export const SET_ACTIVE_FILTERS = 'filters/SET_ACTIVE_FILTERS';
export const SET_FILTER_GROUP_ORDER = 'filters/SET_FILTER_GROUP_ORDER';

export const addFilters = function addFilters (payload) {
  return { payload, type: ADD_FILTERS };
};

export const clearActiveFilters = function clearActiveFilters (payload) {
  return { payload, type: CLEAR_ACTIVE_FILTERS };
};

export const clearFilters = function clearFilters (payload) {
  return { payload, type: CLEAR_FILTERS };
};

export const resetFilters = function resetFilters () {
  return { type: RESET_FILTERS };
};

export const setActiveFilters = function setActiveFilters (payload) {
  return { payload, type: SET_ACTIVE_FILTERS };
};

export const setFilterGroupOrder = function setFilterGroupOrder (payload) {
  return { payload, type: SET_FILTER_GROUP_ORDER };
};
