import * as actions from '../actions';
import { _ } from 'underscore';

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
  records: null,
  record: null,
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
      const { datastoreUid, recordId, holdingsData } = action.payload;

      if (holdingsData.length > 0 && state.records[datastoreUid] && state.records[datastoreUid][recordId]) {
        return {
          ...state,
          records: {
            ...state.records,
            [datastoreUid]: {
              ...state.records[datastoreUid],
              [recordId]: {
                ...state.records[datastoreUid][recordId],
                holdings: _.groupBy(holdingsData, 'type')
              }
            }
          }
        }
      }

      return state;
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
    case actions.SET_RECORD_HOLDINGS:
      return Object.assign({}, state, {
        record: {
          ...state.record,
          holdings: _.groupBy(action.payload, 'type')
        }
      });
    case actions.LOADING_RECORDS:
      return Object.assign({}, state, {
        loading: {
          ...state.loading,
          [action.payload.datastoreUid]: action.payload.loading
        }
      })
    case actions.LOADING_HOLDINGS:
      if (!state.records[action.payload.datastoreUid] || !state.records[action.payload.datastoreUid][action.payload.recordId]) {
        return state;
      }

      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastoreUid]: {
            ...state.records[action.payload.datastoreUid],
            [action.payload.recordId]: {
              ...state.records[action.payload.datastoreUid][action.payload.recordId],
              loadingHoldings: action.payload.loading
            }
          }
        }
      }
    default:
      return state;
  }
};

export default recordsReducer;
