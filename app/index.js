import React from 'react'
import ReactDOM from 'react-dom'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { store, history } from './store.js'

import routes from './routes'

const router = (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)

const renderApp = () => {
  ReactDOM.render(router, document.getElementById('app'))
}

store.subscribe(renderApp)
renderApp()
