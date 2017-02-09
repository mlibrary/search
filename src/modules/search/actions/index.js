export const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';
export const SEARCHING = 'search/SEARCHING';
export const SET_SEARCH_DATA = 'search/SET_SEARCH_DATA';
export const SET_PAGE = 'search/SET_PAGE';

export const setSearchQuery = function submitSearch(payload) {
  return { type: SET_SEARCH_QUERY, payload };
};

export const clearSearch = function clearSearch() {
  return { type: CLEAR_SEARCH };
};

export const searching = function searching() {
  return { type: SEARCHING };
};

export const setSearchData = function setSearchData(payload) {
  return { type: SET_SEARCH_DATA, payload };
}

export const setPage = function setPage(payload) {
  return { type: SET_PAGE, payload };
}
