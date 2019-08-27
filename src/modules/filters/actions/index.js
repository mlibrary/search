export const ADD_FILTER_GROUP = 'filters/ADD_FILTER_GROUP'
export const CLEAR_FILTERS = 'filters/CLEAR_FILTERS'
export const SET_ACTIVE_FILTERS = 'filters/SET_ACTIVE_FILTERS'
export const CLEAR_ACTIVE_FILTERS = 'filters/CLEAR_ACTIVE_FILTERS'
export const OPEN_FILTER = 'filters/OPEN_FILTER'
export const SET_FILTER_GROUP_ORDER = 'filters/SET_FILTER_GROUP_ORDER'

export const addFilterGroup = function addFilterGroup(payload) {
  return { type: ADD_FILTER_GROUP, payload };
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

export const setFilterGroupOrder = function setFilterGroupOrder(payload) {
  return { type: SET_FILTER_GROUP_ORDER, payload}
}
