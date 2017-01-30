import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux'
import { syncHistoryWithStore } from 'react-router-redux';

import { datastoresReducer } from './modules/datastores';
import { searchReducer } from './modules/search';

const rootReducer = combineReducers({
  datastores: datastoresReducer,
  search: searchReducer,
  routing: routerReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const history = syncHistoryWithStore(browserHistory, store);

export {
  store,
  history,
}
