import {
  ADD_DATASTORE, CHANGE_ACTIVE_DATASTORE,
  SUBMIT_SEARCH, ADD_RECORD, CLEAR_RECORDS,
  REQUEST_HOLDINGS, RECIEVE_HOLDINGS,
  LOADED, LOADING, ADD_FACET
} from '.././actions/actions.js'
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
        data: action.payload
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

export const holdingsReducer = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case REQUEST_HOLDINGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECIEVE_HOLDINGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.holdings
      })
    default:
      return state
  }
}

export const loadingReducer = (state = true, action) => {
  switch (action.type) {
    case LOADED:
      return false
    case LOADING:
      return true
    default:
      return state
  }
}

//export const addFacet =

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
  datastores: datastoresReducer,
  active_datastore: activeDatastoreReducer,
  search: searchReducer,
  records: recordsReducer,
  routing: routerReducer,
  holdings: holdingsReducer
})
