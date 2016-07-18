export const ADD_DATASTORE = 'ADD_DATASTORE'
export const SET_ACTIVE = 'SET_ACTIVE'

export function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}

export function setDatastore(payload) {
  return { type: SET_ACTIVE, payload }
}
