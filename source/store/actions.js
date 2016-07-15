/*
 *  Action Types
 */

const ADD_DATASTORE = 'ADD_DATASTORE'
const TOGGLE_ACTIVE = 'TOGGLE_ACTIVE'
const CHANGE_ACTIVE_DATASTORE = 'CHANGE_ACTIVE_DATASTORE'

function addDatastore(payload) {
  return { type: ADD_DATASTORE, payload}
}

function fetchDatastores() {
  return []
}
