import * as actions from '../actions';

const recordsInitialState = {
  loading: false,
  records: null,
  record: null
};

const recordsReducer = (state = recordsInitialState, action) => {
  if (action.type === actions.ADD_HOLDINGS) {
    const { datastoreUid, recordUid, holdings } = action.payload;
    // Find the record index using native JavaScript
    const recordIndex = state.records[datastoreUid].findIndex((item) => {
      return item.uid === recordUid;
    });

    if (recordIndex !== -1) { // If the record is found in the array
      // Construct a new records object with updated holdings
      const newRecords = [
        ...state.records[datastoreUid].slice(0, recordIndex),
        {
          ...state.records[datastoreUid][recordIndex],
          resourceAccess: holdings.filter(Boolean), // Remove falsy values using filter
          loadingHoldings: false
        },
        ...state.records[datastoreUid].slice(recordIndex + 1)
      ];

      return {
        ...state,
        records: {
          ...state.records,
          [datastoreUid]: newRecords
        }
      };
    }

    // Return unchanged state if the record index is not found
    return state;
  }

  if (action.type === actions.ADD_RECORDS) {
    return {
      ...state,
      records: {
        ...state.records,
        [action.payload.datastoreUid]: action.payload.records
      }
    };
  }

  if (action.type === actions.CLEAR_RECORD) {
    return {
      ...state,
      record: null
    };
  }

  if (action.type === actions.CLEAR_RECORDS) {
    return {
      ...state,
      records: {
        ...state.records,
        [action.payload]: undefined
      }
    };
  }

  if (action.type === actions.LOADING_RECORDS) {
    return {
      ...state,
      loading: {
        ...state.loading,
        [action.payload.datastoreUid]: action.payload.loading
      }
    };
  }

  if (action.type === actions.SET_RECORD) {
    return {
      ...state,
      record: action.payload };
  }

  if (action.type === actions.SET_RECORD_GET_THIS) {
    return {
      ...state,
      record: {
        ...state.record,
        getthis: action.payload
      }
    };
  }

  if (action.type === actions.SET_RECORD_HOLDINGS) {
    return {
      ...state,
      record: {
        ...state.record,
        resourceAccess: action.payload.filter(Boolean)
      }
    };
  }

  return state;
};

export default recordsReducer;
