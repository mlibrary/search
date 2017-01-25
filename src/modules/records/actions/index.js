export const ADD_RECORD = 'records/ADD_RECORD';
export const CLEAR_RECORDS = 'records/CLEAR_RECORDS';
export const SET_RECORD = 'records/SET_RECORD';

export function addRecord(payload) {
  return { type: ADD_RECORD, payload };
}

export function clearRecords(payload) {
  return { type: CLEAR_RECORDS, payload };
}

export function setRecord(payload) {
  return { type: SET_RECORD, payload };
}
