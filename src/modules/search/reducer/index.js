import * as actions from '../actions/';

const initialState = {
  searching: false,
  query: "",
  data: null,
  advanced: {},
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
    case actions.ADD_ADVANCED_DATASTORE:
      return Object.assign({}, state, {
        advanced: {
          ...state.advanced,
          [action.payload.datastoreUid]: advancedDatastoreReducer(undefined, action),
        },
      });
    default:
      return state;
  }
}

const advancedDatastoreReducer = (state, action) => {
  switch (action.type) {
    case actions.ADD_ADVANCED_DATASTORE:
      return {
        defaultField: action.payload.defaultField,
        fields: action.payload.fields,
        filters: action.payload.filters,
      }
    default:
      return state;
  }
}

export default searchReducer
