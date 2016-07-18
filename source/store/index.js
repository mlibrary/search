import { combineReducers } from 'redux'
import { datastores } from './reducers.js'
import { createStore } from 'redux'

export const datastoreReducers = combineReducers({
  datastores
})

export let store = createStore(datastoreReducers)
