import * as actions from '../actions/';

const initialState = {
  searching: false,
  query: "",
  data: null,
  page: 1,
}

const searchReducer = function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCH_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
      });
    case actions.SEARCHING:
      return Object.assign({}, state, {
        searching: true,
      });
    case actions.SET_SEARCH_DATA:
      return Object.assign({}, state, {
        data: action.payload,
      });
    case actions.SET_PAGE:
      return Object.assign({}, state, {
        page: action.payload,
      });
    case actions.CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
}

export default searchReducer
