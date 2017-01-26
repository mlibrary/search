import { Pride } from 'pride';
import { _ } from 'underscore';

import config from './config';
import { store } from '../store';

import {
  addDatastore,
  changeActiveDatastore
} from '../modules/datastores';

/*
  Pride Internal Configuration
*/
Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/"; // DEV
//Pride.Settings.datastores_url = "https://dev.www.lib.umich.edu/testapp/spectrum/"; // PROD
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false; // Console log messages

/*
  Return Search Objects constructed from their
  relative datastore objects
*/
const getSearchObjects = function getSearchObjects() {
  const datastores = Pride.AllDatastores.array.filter(function (ds) {
    const config_datastores = _.pluck(config.datastores.naming, 'uid');
    /*
      TODO:
        1. Create Bentobox (multisource) search object(s).
        2. Order search object based on configuration.
    */
    return _.contains(config_datastores, ds.get('uid'));
  });

  const search_objects = datastores.map((ds) => {
    return ds.baseSearch();
  });

  const ordered = config.datastores.ordering.map(function (uid) {
    return _.findWhere(search_objects, { uid: uid });
  })

  return _.filter(ordered, function (so) {
    return so !== undefined
  })
}

/*
  Setup Pride does a few things:
    1. Create datastore search objects
    2. Setup result (record) observers
*/
const setupPride = function loadPride() {
  const search_objects = getSearchObjects();
  /*
    Search objects is the search wrapper around a datastore. We use these when
    constructing a search switcher and for accessing datastore metadata.
  */
  _.each(search_objects, function (so) {
    // Pull the configured datastore name (uid lookup matching)
    const configured_ds = _.findWhere(config.datastores.naming, { uid: so.uid });


    store.dispatch(addDatastore({
      uid: so.uid,
      name: configured_ds.name,
      slug: configured_ds.slug || so.uid
    }))
  });
}

/*
  Initialize Pride kicks off Pride's internal init and checks if
  communication with the back-end (Spectrum) is established.
*/
const initializePride = function initializePride() {
  Pride.init({
    success: () => {
      console.log('Pride successfuly loaded.');
      setupPride('');
    },
    failure: () => {
      console.log("Pride failed to load.");
    },
  });
}

/*
  Expose functions that are useful externally
*/
export {
  initializePride,
}
