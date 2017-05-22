import React from 'react'
import ReactDOM from 'react-dom'
import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux'
import createHistory from 'history/createHashHistory'

import { datastoresReducer } from './modules/datastores'
import { searchReducer } from './modules/search'
import { recordsReducer } from './modules/records'
import { filtersReducer } from './modules/filters'

import {
  NoMatch,
  IndexPage,
  DatastorePage,
  AdvancedPage,
} from './modules/pages'

import { getDatastore } from './pride-interface/utilities'

const reducers = combineReducers({
  datastores: datastoresReducer,
  records: recordsReducer,
  search: searchReducer,
  routing: routerReducer,
  filters: filtersReducer,
});

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware))
)

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path={`/:datastoreUid`} exact render={({ match }) => {
            const ds =  getDatastore({
              uid: match.params.datastoreUid,
              datastores: store.datastores
            })

            return (
              ds ? (
                <DatastorePage match={match} ds={ds} />
              ) : (
                <NoMatch />
              )
            )
          }}/>
          <Route path={`/:datastoreUid/advanced`} exact render={({ match }) => {
            const ds =  getDatastore({
              uid: match.params.datastoreUid,
              datastores: store.datastores
            })

            return (
              ds ? (
                <AdvancedPage match={match} ds={ds} />
              ) : (
                <NoMatch />
              )
            )
          }}/>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
