import React from 'react'
import ReactDOM from 'react-dom'

import { Pride } from './source/libraries/pride.js'
import { _ } from 'underscore'
import { App } from './source/components/App.js'
import { addDatastore } from './source/store/actions.js'
import { changeActiveDatastore } from './source/store/actions.js'
import { store } from './source/store/index.js'

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
  var pride_datastores = Pride.AllDatastores.array
  var config = require("json!./source/config.json")

  var datastores = configureDatastores(pride_datastores, config)

  _.each(datastores, (datastore) => {
    store.dispatch(addDatastore({
      uid: datastore.uid,
      name: datastore.name
    }))
  })
}

function configureDatastores(pride_datastores, config) {
  var datastores_unsorted = _.reduce(pride_datastores, (datastores, datastore) => {
    var uid        = datastore.get('uid')
    var name       = datastore.get('metadata').name

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
    //TODO setup first to be default
  }

  return datastores_unsorted

  //TODO add in multisource datastores
  //TODO sorting by configuration

  /*
  var datastores_ordering = config.datastores.ordering
  var datastores_sorted = _.sortBy(datastores_unsorted, (ds, i) => {
    console.log('ds', ds)
    console.log('i', i)
  })

  return datastores_sorted
  */
}

store.subscribe(() => {
  console.log('Store Updated!', store.getState())
})

const renderApp = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('app')
  )
}

store.subscribe(renderApp)
renderApp()
