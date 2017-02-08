import { createStore, combineReducers, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { routerReducer } from 'react-router-redux'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { datastoresReducer } from './modules/datastores';
import { searchReducer } from './modules/search';
import { RecordsReducer } from './modules/records'

const rootReducer = combineReducers({
  datastores: datastoresReducer,
  records: RecordsReducer,
  search: searchReducer,
  routing: routerReducer,
});

const middleware = routerMiddleware(browserHistory);

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(middleware)
));

const history = syncHistoryWithStore(browserHistory, store);

store.subscribe(() => {
  //console.log('%c store updated ', 'background: #126DC1; color: white;', store.getState())
})

export {
  store,
  history,
}
