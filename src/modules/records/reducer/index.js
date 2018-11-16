import * as actions from '../actions';
import { _ } from 'underscore'

const recordsInitialState = {
  loading: false,
  records: null,
  record: null,
};

/*
// Use compact with ResourceAccess data to remove falsy values in the array.
// Bug tacked here: SEARCH-775
*/

const recordsReducer = (state = recordsInitialState, action) => {
  switch (action.type) {
    case actions.ADD_RECORDS:
      return {
        ...state,
        records: {
          ...state.records,
          [action.payload.datastoreUid]: action.payload.records
        }
      }
    case actions.ADD_HOLDINGS:
      const { datastoreUid, recordUid, holdings } = action.payload;
      const recordIndex = _.findIndex(state.records[datastoreUid], (item) => item.uid === recordUid)

      if (recordIndex !== -1) { // contains this record
        return Object.assign({}, state, {
          records: {
            ...state.records,
            [datastoreUid]: state.records[datastoreUid]
              .slice(0, recordIndex)
              .concat([{
                ...state.records[datastoreUid][recordIndex],
                resourceAccess: _.compact(holdings),
                loadingHoldings: false
              }])
              .concat(state.records[datastoreUid].slice(recordIndex + 1))
          }
        })
      }

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
    case actions.SET_RECORD_HOLDINGS:
      return Object.assign({}, state, {
        record: {
          ...state.record,
          resourceAccess: _.compact(action.payload)
        }
      });
    case actions.SET_RECORD_GET_THIS:
    return Object.assign({}, state, {
      record: {
        ...state.record,
        getthis: action.payload
      }
    });
    case actions.LOADING_RECORDS:
      return Object.assign({}, state, {
        loading: {
          ...state.loading,
          [action.payload.datastoreUid]: action.payload.loading
        }
      })
    default:
      return state;
  }
};

export default recordsReducer;
