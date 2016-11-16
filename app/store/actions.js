export const ADD_DATASTORE = 'ADD_DATASTORE'
export const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'

export function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}

export function changeActiveDatastore(payload) {
  return { type: CHANGE_ACTIVE_DATASTORE, payload }
}
