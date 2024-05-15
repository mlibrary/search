import * as actions from '../actions/';

const initialState = {
  data: null,
  page: {},
  parserMessage: null,
  query: '',
  queryInput: '',
  searching: false,
  sort: {}
};

const searchReducer = function searchReducer (state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCH_QUERY:
      return {
        ...state,
        query: action.payload
      };
    case actions.SET_SEARCH_QUERY_INPUT:
      return {
        ...state,
        queryInput: action.payload
      };
    case actions.SEARCHING:
      return {
        ...state,
        searching: action.payload
      };
    case actions.SET_SEARCH_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.datastoreUid]: action.payload.data
        }
      };
    case actions.SET_PAGE:
      return {
        ...state,
        page: {
          ...state.page,
          [action.payload.datastoreUid]: action.payload.page
        }
      };
    case actions.CLEAR_SEARCH:
      return initialState;
    case actions.RESET_SORT:
      return {
        ...state,
        sort: {}
      };
    case actions.SET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          [action.payload.datastoreUid]: action.payload.sort
        }
      };
    case actions.SET_PARSER_MESSAGE: {
      return {
        ...state,
        parserMessage: action.payload
      };
    }
    default:
      return state;
  }
};

export default searchReducer;
