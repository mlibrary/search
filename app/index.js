import React from 'react'
import ReactDOM from 'react-dom'

import { _ } from 'underscore'
import { App } from './components/App.js'
import { store } from './store/index.js'
import { pride_interface } from './store/pride_interface.js'

store.subscribe(() => {
  console.log('%c store updated ', 'background: #126DC1; color: white;', store.getState())
})

const renderApp = () => {
  ReactDOM.render(
    <App
      state={Object.assign({}, store.getState())}
    />,
    document.getElementById('app')
  )
}

renderApp() // initial render

store.subscribe(renderApp) // every store update, render
