import React from 'react'
import ReactDOM from 'react-dom'

import { Pride } from './libraries/pride.js'
import { _ } from 'underscore'
import { App } from './components/App.js'
import { addDatastore } from './store/actions.js'
import { changeActiveDatastore } from './store/actions.js'
import { store } from './store/index.js'

Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

function initPride() {
  Pride.init({
    success: () => {
      console.log('Pride loaded successfully.')
      loadPride()
    },
    failure: () => {
      console.log('Pride failed to load.')
    }
  })
}

initPride();

function loadPride() {
  var pride_datastores = Pride.AllDatastores
  var pride_datastores_array = pride_datastores.array
  var config = require("json!./config.json")
  var datastores = configureDatastores(pride_datastores_array, config)

  // Add datastores to store
  _.each(datastores, (datastore) => {
    store.dispatch(addDatastore({
      uid: datastore.uid,
      name: datastore.name
    }))
  })
}

function configureDatastores(pride_datastores, config) {
  var datastores_unsorted = _.reduce(pride_datastores, (datastores, datastore) => {
    var uid  = datastore.get('uid')
    var name = datastore.get('metadata').name

    if (_.contains(config.datastores.ordering, uid)) {
      var config_datastore = _.findWhere(config.datastores.naming, {"uid": uid})
      var config_name = config_datastore.name;

      datastores.push({
        uid: uid,
        name: config_name
      })
    }

    return datastores
  },[])

  // Select and activate default datastore
  if (_.findWhere(datastores_unsorted, {uid: config.datastores.default})) {
    store.dispatch(changeActiveDatastore(config.datastores.default))
  } else {
    console.log('[Warning - Config]: Couldn\'t find \"' + config.datastores.default + '\" as the default datastore')
    //TODO setup first to be default if no default given
  }

  //TODO add in multisource datastores

  //TODO sorting by configuration

  return datastores_unsorted
}

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

store.subscribe(renderApp)
