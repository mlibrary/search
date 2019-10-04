import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import { datastoresReducer } from './modules/datastores'
import { searchReducer } from './modules/search'
import { recordsReducer } from './modules/records'
import { filtersReducer } from './modules/filters'
import { advancedReducer } from './modules/advanced'
import { institutionReducer } from './modules/institution'
import { browseReducer } from './modules/browse'
import { specialistsReducer } from './modules/specialists'
import { listsReducer } from './modules/lists'
import { a11yReducer } from './modules/a11y'
import { profileReducer } from './modules/profile'
import { favoritesReducer } from './modules/favorites'
import { affiliationReducer } from './modules/affiliation'

import history from './history'

const rootReducer = combineReducers({
  router: connectRouter(history),
  datastores: datastoresReducer,
  records: recordsReducer,
  search: searchReducer,
  filters: filtersReducer,
  advanced: advancedReducer,
  institution: institutionReducer,
  browse: browseReducer,
  specialists: specialistsReducer,
  lists: listsReducer,
  a11y: a11yReducer,
  profile: profileReducer,
  favorites: favoritesReducer,
  affiliation: affiliationReducer
})

const middleware = [routerMiddleware(history)]

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
