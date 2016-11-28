import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE, SUBMIT_SEARCH, ADD_RECORD, CLEAR_RECORDS } from '.././actions/actions.js'
import { combineReducers } from 'redux'
import { _ } from 'underscore'
import { routerReducer } from 'react-router-redux'

export const datastoreReducer = (state, action) => {
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

export const datastoresReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_DATASTORE:
      return [
        ...state,
        datastoreReducer(undefined, action)
      ]
    default:
      return state
  }
}

export const activeDatastoreReducer = (state = "", action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_DATASTORE:
      return action.payload
    default:
      return state
  }
}

export const searchReducer = (state = "", action) => {
  switch (action.type) {
    case SUBMIT_SEARCH:
      return action.payload
    default:
      return state
  }
}

export const recordReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECORD:
      return {
        partial: action.payload,
      }
    default:
      return state
  }
}

export const recordsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_RECORD:
      return [
        ...state,
        recordReducer(undefined, action)
      ]
    case CLEAR_RECORDS:
      return []
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  datastores: datastoresReducer,
  active_datastore: activeDatastoreReducer,
  search: searchReducer,
  records: recordsReducer,
  routing: routerReducer
})
