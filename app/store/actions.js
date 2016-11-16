export const ADD_DATASTORE = 'ADD_DATASTORE'
export const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'
export const SUBMIT_SEARCH = 'SUBMIT_SEARCH'

export function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}

export function changeActiveDatastore(payload) {
  return { type: CHANGE_ACTIVE_DATASTORE, payload }
}

export function submitSearch(payload) {
  return { type: SUBMIT_SEARCH, payload }
}
