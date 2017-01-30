export const SUBMIT_SEARCH = 'search/SUBMIT_SEARCH';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';
export const SEARCHING = 'search/SEARCHING';


export const submitSearch = function submitSearch(payload) {
  return { type: SUBMIT_SEARCH, payload };
};

export const clearSearch = function clearSearch() {
  return { type: CLEAR_SEARCH };
};

export const searching = function searching() {
  return { type: SEARCHING };
};
