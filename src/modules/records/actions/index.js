export const ADD_RECORD = 'records/ADD_RECORD';
export const CLEAR_RECORDS = 'records/CLEAR_RECORDS';
export const CLEAR_RECORD = 'records/CLEAR_RECORD';
export const SET_RECORD = 'records/SET_RECORD';
export const LOADING_RECORDS = 'records/LOADING_RECORDS';
export const ADD_HOLDINGS = 'records/ADD_HOLDINGS';
export const LOADING_HOLDINGS = 'records/LOADING_HOLDINGS';
export const SET_RECORD_HOLDINGS = 'records/SET_RECORD_HOLDINGS';
export const SET_RECORD_GET_THIS = 'records/SET_RECORD_GET_THIS';

export function addRecord(payload) {
  return { type: ADD_RECORD, payload };
}

export function clearRecords(payload) {
  return { type: CLEAR_RECORDS, payload };
}

export function setRecord(payload) {
  return { type: SET_RECORD, payload };
}

export function clearRecord(payload) {
  return { type: CLEAR_RECORD, payload };
}

export function loadingRecords(payload) {
  return { type: LOADING_RECORDS, payload };
}

export function addHoldings(payload) {
  return { type: ADD_HOLDINGS, payload };
}

export function loadingHoldings(payload) {
  return { type: LOADING_HOLDINGS, payload };
}

export function setRecordHoldings(payload) {
  return { type: SET_RECORD_HOLDINGS, payload };
}

export function setRecordGetThis(payload) {
  return { type: SET_RECORD_GET_THIS, payload };
}
