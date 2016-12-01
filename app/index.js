import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'

import { App, Datastore, NoMatch, Default } from './components/'
import { history, store } from './store.js'

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Default}/>
        <Route path="/:datastore_id" component={Datastore}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(router, document.getElementById('app'))
