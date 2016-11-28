import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'

import { Main } from './components/Main.js'
import { NoMatch } from './components/NoMatch.js'
import { history, store } from './store.js'

const routes = {
  path: '/',
  component: Main,
  childRoutes: [
    { path: '*', component: NoMatch }
  ]
}

const renderApp = () => {
  ReactDOM.render(
    (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    ), document.getElementById('app')
  )
}

store.subscribe(renderApp)
renderApp()
