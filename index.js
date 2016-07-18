import { createStore } from 'redux'
import React from 'react'
import ReactDOM from 'react-dom'

import { Pride } from './source/libraries/pride.js'
import { _ } from 'underscore'

import { addDatastore } from './source/store/actions.js'
import { datastoreReducers } from './source/store/index.js'
import { Datastores } from './source/components/Datastores.js'

let store = createStore(datastoreReducers)

Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

function initPride() {
  Pride.init({
    success: function() {
      console.log('Pride loaded successfully.')
      loadPride()
    },
    failure: function() {
      console.log('Pride failed to load.')
    }
  })
}

initPride();

function loadPride() {
  var datastores = Pride.AllDatastores.array

  _.each(datastores, function(datastore) {
    var uid        = datastore.get('uid')
    var name       = datastore.get('metadata').name
    var short_desc = datastore.get('metadata').short_desc

    store.dispatch(addDatastore({
      uid: uid,
      name: name,
      short_desc: short_desc
    }))
  })
}

store.subscribe(() => {
  console.log('Store Updated!', store.getState())
})

const renderApp = () => {
  ReactDOM.render(
    <Datastores
      datastores = {store.getState().datastores}
    />,
    document.getElementById('app')
  )
}

store.subscribe(renderApp)
renderApp()
