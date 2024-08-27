export const ADD_HOLDINGS = 'records/ADD_HOLDINGS';
export const ADD_RECORDS = 'records/ADD_RECORDS';
export const CLEAR_RECORD = 'records/CLEAR_RECORD';
export const CLEAR_RECORDS = 'records/CLEAR_RECORDS';
export const LOADING_HOLDINGS = 'records/LOADING_HOLDINGS';
export const LOADING_RECORDS = 'records/LOADING_RECORDS';
export const SET_RECORD = 'records/SET_RECORD';
export const SET_RECORD_HOLDINGS = 'records/SET_RECORD_HOLDINGS';
export const SET_RECORD_GET_THIS = 'records/SET_RECORD_GET_THIS';

export const addHoldings = (payload) => {
  return { payload, type: ADD_HOLDINGS };
};

export const addRecords = (payload) => {
  return { payload, type: ADD_RECORDS };
};

export const clearRecord = (payload) => {
  return { payload, type: CLEAR_RECORD };
};

export const clearRecords = (payload) => {
  return { payload, type: CLEAR_RECORDS };
};

export const loadingHoldings = (payload) => {
  return { payload, type: LOADING_HOLDINGS };
};

export const loadingRecords = (payload) => {
  return { payload, type: LOADING_RECORDS };
};

export const setRecord = (payload) => {
  return { payload, type: SET_RECORD };
};

export const setRecordGetThis = (payload) => {
  return { payload, type: SET_RECORD_GET_THIS };
};

export const setRecordHoldings = (payload) => {
  return { payload, type: SET_RECORD_HOLDINGS };
};
