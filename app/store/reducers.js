import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE, SUBMIT_SEARCH, ADD_RECORD, CLEAR_RECORDS } from './actions.js'
import { combineReducers } from 'redux'
import { _ } from 'underscore'

const datastore = (state, action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return {
        uid: action.payload.uid,
        name: action.payload.name
      }
    default:
      return state
  }
}

const datastores = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return [
        ...state,
        datastore(undefined, action)
      ]
    default:
      return state
  }
}

const active_datastore = (state = "", action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_DATASTORE:
      return action.payload
    default:
      return state
  }
}

const search = (state = "", action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:

      console.log('submit search', action)

      return action.payload
    default:
      return state
  }
}

const record = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        partial: action.payload,
      }
    default:
      return state
  }
}

const records = (state = [], action) => {
  switch (action.type) {
    case ADD_RECORD:
      return [
        ...state,
        record(undefined, action)
      ]
    case CLEAR_RECORDS:
      return []
    default:
      return state
  }
}

export const searchApp = combineReducers({
  datastores,
  active_datastore,
  search,
  records
})
