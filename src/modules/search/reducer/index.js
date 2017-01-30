import * as actions from '../actions/';

const initialState = {
  searching: false,
  search_query: ""
}

const searchReducer = function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SUBMIT_SEARCH:
      return Object.assign({}, state, {
        search_query: action.payload.search_query,
      });
    case actions.SEARCHING:
      return Object.assign({}, state, {
        searching: true,
      });
    case actions.CLEAR_SEARCH:
      return initialState;
    default:
      return state;
  }
}

export default searchReducer
