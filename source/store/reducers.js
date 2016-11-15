import { ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE } from './actions.js'
import { combineReducers } from 'redux'
import { _ } from 'underscore'

import { Pride } from '../libraries/pride.js'

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

export const searchApp = combineReducers({
  datastores,
  active_datastore
})
