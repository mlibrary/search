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
  setSearchData,
  searching
} from '../modules/search';

import {
  renderApp,
} from '../index';

import {
  clearFilters,
  addFilter,
} from '../modules/filters';

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
    Setup search object observers
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

        const data = so.getData()
        store.dispatch(setSearchData(
          {
            "count": data.count,
            "page": data.page,
            "total_pages": data.total_pages,
            "total_available": data.total_available
          }
        ))

        const records_length = store.getState().records.records.length
        const count = data.count // aka page count
        const page = data.page
        const total_available = data.total_available
        const check_last_page = (page - 1) * count + records_length === total_available

        if (records_length === count || check_last_page) {
          //store.dispatch(loadedRecords())
        }
      }
    })

    so.facetsObservers.add(function(filter_groups) {
      const active_datastore = store.getState().datastores.active

      if (active_datastore === so.uid) {
        store.dispatch(clearFilters())

        filter_groups.forEach(filter_group => {
          filter_group.resultsObservers.add(filters => {
            filters.forEach(filter => {
              store.dispatch(addFilter(Object.assign({}, filter, {
                metadata: filter_group.getData('metadata')
              }))) // Look at all these )s
            })
          })
        })

        /*
        _.each(facets_data, function(facet) {
          facet.resultsObservers.add(function(results) {
            _.each(results, function(result) {
              store.dispatch(addFilter({
                uid: facet.uid,
                metadata: facet.getData('metadata'),
                item: result
              }))
            })
          })
        })
        */
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
  const query = store.getState().search.query;
  const page = store.getState().search.page;

  const config = {
    field_tree: Pride.FieldTree.parseField('all_fields', query),
    page: page,
  };

  store.dispatch(searching())
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

const nextPage = () => {
  search_switcher.nextPage()
}

const prevPage = () => {
  search_switcher.prevPage()
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
  nextPage,
  prevPage,
}
