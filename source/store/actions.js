export const ADD_DATASTORE = 'ADD_DATASTORE'
export const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE'
export const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'

export function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}
