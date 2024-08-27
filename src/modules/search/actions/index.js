export const ADD_ADVANCED_DATASTORE = 'search/ADD_ADVANCED_DATASTORE';
export const ADD_ADVANCED_FIELD = 'search/ADD_ADVANCED_FIELD';
export const CLEAR_SEARCH = 'search/CLEAR_SEARCH';
export const REMOVE_ADVANCED_FIELD = 'search/REMOVE_ADVANCED_FIELD';
export const RESET_SORT = 'search/RESET_SORT';
export const SEARCHING = 'search/SEARCHING';
export const SET_ADVANCED_FIELD = 'search/SET_ADVANCED_FIELD';
export const SET_PAGE = 'search/SET_PAGE';
export const SET_PARSER_MESSAGE = 'search/SET_PARSER_MESSAGE';
export const SET_SEARCH_DATA = 'search/SET_SEARCH_DATA';
export const SET_SEARCH_QUERY = 'search/SET_SEARCH_QUERY';
export const SET_SEARCH_QUERY_INPUT = 'search/SET_SEARCH_QUERY_INPUT';
export const SET_SORT = 'search/SET_SORT';

export const addAdvancedDatastore = (payload) => {
  return { payload, type: ADD_ADVANCED_DATASTORE };
};

export const addAdvancedField = (payload) => {
  return { payload, type: ADD_ADVANCED_FIELD };
};

export const clearSearch = () => {
  return { type: CLEAR_SEARCH };
};

export const removeAdvancedField = (payload) => {
  return { payload, type: REMOVE_ADVANCED_FIELD };
};

export const resetSort = () => {
  return { type: RESET_SORT };
};

export const searching = (payload) => {
  return { payload, type: SEARCHING };
};

export const setAdvancedField = (payload) => {
  return { payload, type: SET_ADVANCED_FIELD };
};

export const setPage = (payload) => {
  return { payload, type: SET_PAGE };
};

export const setParserMessage = (payload) => {
  return { payload, type: SET_PARSER_MESSAGE };
};

export const setSearchData = (payload) => {
  return { payload, type: SET_SEARCH_DATA };
};

export const setSearchQuery = (payload) => {
  return { payload, type: SET_SEARCH_QUERY };
};

export const setSearchQueryInput = (payload) => {
  return { payload, type: SET_SEARCH_QUERY_INPUT };
};

export const setSort = (payload) => {
  return { payload, type: SET_SORT };
};
