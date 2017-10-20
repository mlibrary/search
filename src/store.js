import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import {
  routerReducer,
  routerMiddleware
} from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { datastoresReducer } from './modules/datastores'
import { searchReducer } from './modules/search'
import { recordsReducer } from './modules/records'
import { filtersReducer } from './modules/filters'
import { advancedReducer } from './modules/advanced'
import { institutionReducer } from './modules/institution'

import history from './history'

const rootReducer = combineReducers({
  datastores: datastoresReducer,
  records: recordsReducer,
  search: searchReducer,
  filters: filtersReducer,
  router: routerReducer,
  advanced: advancedReducer,
  institution: institutionReducer,
})

const middleware = [routerMiddleware(history)]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
