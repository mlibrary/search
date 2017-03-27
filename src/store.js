import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { datastoresReducer } from './modules/datastores';
import { searchReducer } from './modules/search';
import { recordsReducer } from './modules/records'
import { filtersReducer } from './modules/filters'

const rootReducer = combineReducers({
  datastores: datastoresReducer,
  records: recordsReducer,
  search: searchReducer,
  routing: routerReducer,
  filters: filtersReducer,
});

const middleware = routerMiddleware(browserHistory);

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(middleware)
));

const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
  //
})

export {
  store,
  history,
}
