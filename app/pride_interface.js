import { Pride } from './libraries/pride.js'
import { _ } from 'underscore'
import { store } from './store.js'
import { push } from 'react-router-redux'

import {
  addDatastore, changeActiveDatastore,
  addRecord, clearRecords, submitSearch,
  addFacet, clearFacets
} from './actions/actions.js'

Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/";
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

const initPride = () => {
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

var search_switcher = undefined

const loadPride = () => {
  var pride_datastores = Pride.AllDatastores
  var pride_datastores_array = pride_datastores.array
  var config = require("json!./config.json")
  var datastores = configureDatastores(pride_datastores_array, config)
  var search_objects = [];

  // Add datastores to store
  _.each(datastores, (datastore) => {
    store.dispatch(addDatastore({
      uid: datastore.uid,
      name: datastore.name
    }))

    search_objects.push(Pride.AllDatastores.newSearch(datastore.uid))
  })

  // Add results observers to each search object.
  _.each(search_objects, function(search_object) {
    search_object.resultsObservers.add(function(results) {
      const active_datastore = store.getState().active_datastore

      if (active_datastore == search_object.uid) {
        store.dispatch(clearRecords())

        _.each(results, (record) => {
          if (record != undefined) {
            record.renderFull((record_data) => {
              store.dispatch(addRecord(record_data))
            })
          }
        })
      }
    })

    // Set data observer
    search_object.setDataObservers.add(function(data) {

    })

    // run data observer
    search_object.runDataObservers.add(function(data) {

    })

    search_object.set({count: 10})

    // search object facets observer
    search_object.facetsObservers.add(function(facets_data) {
      _.each(facets_data, function(facet) {
        facet.resultsObservers.add(function(results) {
          const active_datastore = store.getState().active_datastore

          if (active_datastore == search_object.uid) {
            _.each(results, function(result) {
              store.dispatch(addFacet({
                uid: facet.uid,
                metadata: facet.getData('metadata'),
                item: result
              }))
            })
          }
        })

        facet.setDataObservers.add(function(data) {
          const active_datastore = store.getState().active_datastore

          if (active_datastore == search_object.uid) {
            //console.log('setFacet', facet.uid, data)
          }
        })
      })
    })
  })

  search_switcher = new Pride.Util.SearchSwitcher(
    search_objects[0],
    search_objects.slice(1)
  )
}

const configureDatastores = (pride_datastores, config) => {
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

export const prideRunSearch = (search_text) => {
  //const selected_facets = getSelectedFacets()
  const config = {
    page: 1,
    field_tree: Pride.FieldTree.parseField('all_fields', search_text),
    facets: undefined
  }

  store.dispatch(clearFacets())

  search_switcher.set(config).run()
  store.dispatch(submitSearch(search_text))
}

export const prideSwitchToDatastore = (uid) => {
  store.dispatch(clearFacets())
  store.dispatch(changeActiveDatastore(uid))
  search_switcher.switchTo(uid)
}
