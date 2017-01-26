import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux'
import { syncHistoryWithStore } from 'react-router-redux';

import { datastoresReducer } from './modules/datastores';

const rootReducer = combineReducers({
  datastores: datastoresReducer,
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
