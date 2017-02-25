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
      if (state.records[action.payload.datastore] === undefined) {
        return {
          ...state,
          records: {
            ...state.records,
            [action.payload.datastore]: [
              recordReducer(undefined, action)
            ]
          }
        }
      } else {
        return {
          ...state,
          records: {
            ...state.records,
            [action.payload.datastore]: [
              ...state.records[action.payload.datastore],
              recordReducer(undefined, action)
            ]
          }
        }
      }
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
