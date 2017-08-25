import * as actions from '../actions/';

const initialState = {
  searching: false,
  query: "",
  data: null,
  page: {},
  sort: {}
}

const searchReducer = function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.SET_SEARCH_QUERY:
      return Object.assign({}, state, {
        query: action.payload,
      });
    case actions.SEARCHING:
      return Object.assign({}, state, {
        searching: action.payload,
      });
    case actions.SET_SEARCH_DATA:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          [action.payload.datastoreUid]: action.payload.data
        },
      });
    case actions.SET_PAGE:
      return Object.assign({}, state, {
        page: {
          ...state.page,
          [action.payload.datastoreUid]: action.payload.page
        },
      });
    case actions.CLEAR_SEARCH:
      return initialState;
    case actions.SET_SORT:
      return {
        ...state,
        sort: {
          ...state.sort,
          [action.payload.datastoreUid]: action.payload.sort
        }
      }
    default:
      return state;
  }
}

export default searchReducer
