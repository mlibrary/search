export const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';
export const SEARCHING = 'search/SEARCHING';
export const SET_SEARCH_DATA = 'search/SET_SEARCH_DATA';
export const SET_PAGE = 'search/SET_PAGE';
export const SET_SORT = 'search/SET_SORT';
export const ADD_ADVANCED_DATASTORE = 'search/ADD_ADVANCED_DATASTORE'
export const SET_ADVANCED_FIELD = 'search/SET_ADVANCED_FIELD'
export const REMOVE_ADVANCED_FIELD = 'search/REMOVE_ADVANCED_FIELD'

export const setSearchQuery = function submitSearch(payload) {
  return { type: SET_SEARCH_QUERY, payload };
};

export const clearSearch = function clearSearch() {
  return { type: CLEAR_SEARCH };
};

export const searching = function searching(payload) {
  return { type: SEARCHING, payload };
};

export const setSearchData = function setSearchData(payload) {
  return { type: SET_SEARCH_DATA, payload };
}

export const setPage = function setPage(payload) {
  return { type: SET_PAGE, payload };
}

export const setSort = function setSort(payload) {
  return { type: SET_SORT, payload };
}

export const addAdvancedDatastore = function addAdvancedDatastore(payload) {
  return { type: ADD_ADVANCED_DATASTORE, payload };
}

export const setAdvancedField = function setAdvancedField(payload) {
  return { type: SET_ADVANCED_FIELD, payload };
}

export const removeAdvancedField = function removeAdvancedField(payload) {
  return { type: REMOVE_ADVANCED_FIELD, payload };
}
