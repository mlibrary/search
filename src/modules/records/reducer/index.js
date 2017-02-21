import * as actions from '../actions';

const recordReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.ADD_RECORD:
      return action.payload;
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
      return Object.assign({}, state, {
        records: [
          ...state.records,
          recordReducer(undefined, action),
        ],
      });
    case actions.CLEAR_RECORDS:
      return Object.assign({}, state, {
        records: [],
      });
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
