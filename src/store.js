import { createStore, combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux'
import { syncHistoryWithStore } from 'react-router-redux';

import { datastoresReducer } from './modules/datastores';
import { searchReducer } from './modules/search';
import { RecordsReducer } from './modules/records'

const rootReducer = combineReducers({
  datastores: datastoresReducer,
  records: RecordsReducer,
  search: searchReducer,
  routing: routerReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  //console.log('%c store updated ', 'background: #126DC1; color: white;', store.getState())
})

const history = syncHistoryWithStore(browserHistory, store);

export {
  store,
  history,
}
