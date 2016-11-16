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
  var pride_search_objects = [];

  var config = require("json!./config.json")

  var datastores = configureDatastores(pride_datastores_array, config)

  // Add datastores to store
  _.each(datastores, (datastore) => {
    store.dispatch(addDatastore({
      uid: datastore.uid,
      name: datastore.name
    }))

    var pride_search_object = pride_datastores.newSearch(datastore.uid)

    pride_search_object.resultsObservers.add(function(records) {
      console.log('resultsObservers ', records)
    })

    pride_search_object.setDataObservers.add(function(data) {
      console.log('setDataObservers ', data)
    })

    pride_search_object.runDataObservers.add(function(data) {
      console.log('runDataObservers ', data)
    })

    pride_search_object.set({count: 10})

    pride_search_objects.push(pride_search_object)
  })

  var pride_search_switcher = new Pride.Util.SearchSwitcher(
      pride_search_objects[0],
      pride_search_objects.slice(1)
    )

  pride_search_switcher.switchTo(config.datastores.default)

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
    <App
      state={Object.assign({}, store.getState())}
    />,
    document.getElementById('app')
  )
}

store.subscribe(renderApp)
renderApp()
