import { Pride } from 'pride';
import { _ } from 'underscore';

import config from './config';
import { store } from '../store';

import {
  addDatastore,
  changeActiveDatastore,
} from '../modules/datastores';

import {
  addRecord,
  clearRecords,
} from '../modules/records';

import {
  renderApp,
} from '../index';

/*
  Pride Internal Configuration
*/
Pride.Settings.datastores_url = "http://earleyj.www.lib.umich.edu/testapp/spectrum/"; // DEV
//Pride.Settings.datastores_url = "https://dev.www.lib.umich.edu/testapp/spectrum/"; // PROD
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false; // Console log messages

let search_switcher;

/*
  Return Search Objects constructed from their
  relative datastore objects
*/
const getSearchObjects = () => {
  const datastores = Pride.AllDatastores.array.filter(function (ds) {
    const config_datastores = _.pluck(config.datastores.naming, 'uid');
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
const setupPride = () => {
  const search_objects = getSearchObjects();

  /*
    Search objects is the search wrapper around a datastore. We use these when
    constructing a search switcher and for accessing datastore metadata.
  */
  _.each(search_objects, function (so) {
    // Pull the configured datastore name (uid lookup matching)
    const configured_ds = _.findWhere(config.datastores.naming, { uid: so.uid });
    so.set({count: 10});

    store.dispatch(addDatastore({
      uid: so.uid,
      name: configured_ds.name,
      slug: configured_ds.slug || so.uid
    }))
  });

  /*
    Setup results listener
  */
  _.each(search_objects, function(so) {
    so.resultsObservers.add(function(results) {
      const active_datastore = store.getState().datastores.active;

      if (active_datastore === so.uid) {
        store.dispatch(clearRecords());

        _.each(results, (record) => {
          if (record !== undefined) {
            record.renderFull((record_data) => {
              store.dispatch(addRecord(record_data));
            })
          }
        });
      }
    })
  })

  /*
    Setup Search Switcher
  */
  const default_search_object = _.findWhere(search_objects, { uid: config.datastores.default })
  const remaining_search_objects = _.reject(search_objects, (search_object) => {
    return search_object.uid === config.datastores.default
  })

  search_switcher = new Pride.Util.SearchSwitcher(
    default_search_object,
    remaining_search_objects
  )
}

/*
  Initialize Pride kicks off Pride's internal init and checks if
  communication with the back-end (Spectrum) is established.
*/
const initializePride = () => {
  Pride.init({
    success: () => {
      console.log('Pride successfuly loaded.');
      setupPride();
      renderApp();
    },
    failure: () => {
      console.log("Pride failed to load.");
    },
  });
}

const runSearchPride = () => {
  const search_query = store.getState().search.search_query;
  const config = {
    field_tree: Pride.FieldTree.parseField('all_fields', search_query)
  };

  search_switcher.set(config).run();
}

const fetchPrideRecord = (datastore_uid, record_uid) => {
  const record = Pride.requestRecord(datastore_uid, record_uid)

  record.renderFull((record_data) => {
    //store.dispatch(setRecord(record_data))
  })
}

const findUidbySlug = (slug) => {
  const datastores = config.datastores.naming;
  const ds = _.findWhere(datastores, {slug: slug}) || _.findWhere(datastores, {uid: slug});

  if (!ds) {
    return false;
  }

  return ds.uid;
}

const getDatastoreSlugByUid = (uid) => {
  const datastores = config.datastores.naming;
  const ds = _.findWhere(datastores, {uid: uid});

  return ds.slug || ds.uid;
}

const switchToDatastorePride = (slug) => {
  const uid = findUidbySlug(slug);

  if (!uid) {
    return false;
  }

  store.dispatch(changeActiveDatastore(uid))
  search_switcher.switchTo(uid)
}

const isSlugADatastore = (slug) => {
  return findUidbySlug(slug) !== false;
}

/*
  Expose functions that are useful externally
*/
export {
  initializePride,
  runSearchPride,
  fetchPrideRecord,
  switchToDatastorePride,
  isSlugADatastore,
  getDatastoreSlugByUid,
}
