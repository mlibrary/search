import * as actions from '../actions';

const recordReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_RECORD:
      return action.payload.data;
    default:
      return state;
  }
};

const recordsInitialState = {
  loading: false,
  records: [],
  record: null,
  pagination: {},
};

const recordsReducer = (state = recordsInitialState, action) => {
  switch (action.type) {
    case actions.ADD_RECORD:

      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastore]: {
            ...state.records[action.payload.datastore],
            [action.payload.id]: recordReducer(undefined, action)
          }
        }
      }
    case actions.ADD_HOLDINGS:
      console.log('ADD_HOLDINGS')
      console.log('action', action)

      /*
      return {
        ...state,
        records: [
          ...state.records,
          [action.payload.datastore_uid]: [

          ]
        ]
      }
      */

      return state
    case actions.CLEAR_RECORDS:
      return {
        ...state,
        records: {
          ...state.records,
          [action.payload]: undefined,
        }
      }
    case actions.CLEAR_RECORD:
      return Object.assign({}, state, {
        record: null,
      });
    case actions.SET_RECORD:
      return Object.assign({}, state, {
        record: action.payload,
      });
    case actions.LOADING_RECORDS:
      return Object.assign({}, state, {
        loading: action.payload,
      });
    default:
      return state;
  }
};

export default recordsReducer;
