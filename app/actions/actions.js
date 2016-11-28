export const ADD_DATASTORE = 'ADD_DATASTORE'
export const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'
export const ADD_RECORD = 'ADD_RECORD'
export const CLEAR_RECORDS = 'CLEAR_RECORDS'

import { prideSwitchToDatastore, prideRunSearch } from '.././pride_interface.js'

export function addRecord(payload) {
  return { type: ADD_RECORD, payload }
}

export function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}

export function changeActiveDatastore(payload) {
  return { type: CHANGE_ACTIVE_DATASTORE, payload }
}

export function submitSearch(payload) {
  return { type: SUBMIT_SEARCH, payload }
}

export function clearRecords(payload) {
  return { type: CLEAR_RECORDS, payload }
}
