export const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';
export const SEARCHING = 'search/SEARCHING';


export const setSearchQuery = function submitSearch(payload) {
  return { type: SET_SEARCH_QUERY, payload };
};

export const clearSearch = function clearSearch() {
  return { type: CLEAR_SEARCH };
};

export const searching = function searching() {
  return { type: SEARCHING };
};
