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
  setRecord,
  clearRecord,
  loadingRecords
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
if (process.env.NODE_ENV !== 'production') {
  Pride.Settings.datastores_url = config.spectrum.development;
} else {
  Pride.Settings.datastores_url = config.spectrum.production;
}

Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false; // Console log messages

let searchSwitcher;

/*
const getMultiSearchObjects = () => {
  const multiSearchesConfig = config.datastores.multi;
  const allDatastores = Pride.AllDatastores.array;

  const multiSearches = _.map(multiSearchesConfig, (multiSearchConfig) => {
    const searchObjects = allDatastores.reduce(function(memo, datastore) {
      const uid = datastore.get('uid');

      if (_.contains(multiSearchConfig.datastores, uid)) {
        memo.push(datastore.baseSearch())
      }
      return memo;
    }, []);

    const MultiSearch = new Pride.Util.MultiSearch(multiSearchConfig.uid, true, searchObjects);
    MultiSearch.set({count: 3});

    return MultiSearch;
  })

  return multiSearches;
}
*/

const getSearchObjects = () => {
  const allDatastores = Pride.AllDatastores.array;
  const configDatastores = config.datastores.list;

  const searchObjects = configDatastores.reduce(function(memo, configDs) {

    // Single Result Datastore
    if (configDs.datastores.length === 1) {
      const configDsUid = configDs.datastores[0];

      const foundDatastore = _.find(allDatastores, function(ds) {
        const uid = ds.get('uid');

        return uid === configDsUid
      })

      memo.push(foundDatastore.baseSearch())

    // Multi Result Datastore
    } else {

    }

    return memo;
  }, []);

  const ordered = config.datastores.ordering.map(function (uid) {
    return _.findWhere(searchObjects, { uid: uid });
  })

  return _.filter(ordered, function (so) {
    return so !== undefined
  })
}

const getDatastoreName = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid: uid })

  if (ds && ds.name) {
    return ds.name
  }

  return undefined;
}

const getDatastoreSlug = (uid) => {
  const ds = _.findWhere(config.datastores.list, { uid: uid })

  if (ds && ds.slug) {
    return ds.slug
  }

  return undefined;
}

const setupPride = () => {
  const searchObjects = getSearchObjects();

  /*
    Search objects is the search wrapper around a datastore. We use these when
    constructing a search switcher and for accessing datastore metadata.
  */
  _.each(searchObjects, function (so) {
    const name = getDatastoreName(so.uid);
    const slug = getDatastoreSlug(so.uid);

    store.dispatch(addDatastore({
      uid: so.uid,
      name: name,
      slug: slug || so.uid
    }))
  });

  /*
    Setup search object observers
  */
  _.each(searchObjects, function(so) {
    so.resultsObservers.add(function(results) {
      const activeDatastore = store.getState().datastores.active;

      if (activeDatastore === so.uid) {
        store.dispatch(clearRecords());

        console.log('---- results ----')
        console.log('activeDatastore', activeDatastore)
        console.log('searchObject', so)
        console.log('activeDatastore === so.uid', activeDatastore === so.uid, activeDatastore, so.uid)
        console.log('results', results)

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
            "total_available": data.total_available,
            "sorts": data.sorts,
            "selected_sort": data.selected_sort,
          }
        ))

        const records_length = store.getState().records.records.length
        const count = data.count // aka page count
        const page = data.page
        const total_available = data.total_available
        const check_last_page = (page - 1) * count + records_length === total_available

        // Check to see if records have loaded.
        if (records_length === count || check_last_page) {
          store.dispatch(loadingRecords(false))
        }
      }
    })

    so.facetsObservers.add(function(filter_groups) {
      const activeDatastore = store.getState().datastores.active

      if (activeDatastore === so.uid) {
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
      }
    })

  })

  /*
    Setup Search Switcher
  */
  const defaultSearchObject = _.findWhere(searchObjects, { uid: config.datastores.default })
  const remainingSearchObjects = _.reject(searchObjects, (so) => {
    return so.uid === config.datastores.default
  })

  searchSwitcher = new Pride.Util.SearchSwitcher(
    defaultSearchObject,
    remainingSearchObjects
  )
}

/*
  Initialize Pride kicks off Pride's internal init and checks if
  communication with the back-end (Spectrum) is established.
*/
const initializePride = () => {
  Pride.init({
    success: () => {
      setupPride();
      renderApp();
    },
    failure: () => {
      console.log("Pride failed to load.");
    },
  });
}

const runSearchPride = () => {
  const state = store.getState();
  const query = state.search.query;
  const page = state.search.page;
  const facets = state.filters.active[state.datastores.active];

  console.log('------------')
  console.log('runSearchPride')
  console.log('query', query)

  const config = {
    field_tree: Pride.FieldTree.parseField('all_fields', query),
    page: page,
    facets: facets,
  };

  console.log('config', config)

  store.dispatch(searching(true))
  store.dispatch(loadingRecords(true))
  searchSwitcher.set(config).run();
}

const getDatastoreUidBySlug = (slugParam) => {
  const slugDs = _.findWhere(config.datastores.list, {slug: slugParam})
  const uidDs = _.findWhere(config.datastores.list, {uid: slugParam});
  const ds = slugDs || uidDs;

  if (!ds) {
    return false;
  }

  return ds.uid;
}

const getDatastoreSlugByUid = (uid) => {
  const ds = _.findWhere(config.datastores.list, {uid: uid});

  return ds.slug || ds.uid;
}

const switchToDatastorePride = (slug) => {
  const uid = getDatastoreUidBySlug(slug);

  if (!uid) {
    return false;
  }

  store.dispatch(changeActiveDatastore(uid))
  searchSwitcher.switchTo(uid)
}

const isSlugADatastore = (slug) => {
  const slugDs = _.findWhere(config.datastores.list, {slug: slug})
  const uidDs = _.findWhere(config.datastores.list, {uid: slug});

  return slugDs || uidDs
}

const nextPage = () => {
  searchSwitcher.nextPage()
}

const prevPage = () => {
  searchSwitcher.prevPage()
}

const requestPrideRecord = (datastoreUid, recordUid) => {
  if (datastoreUid && recordUid) {
    store.dispatch(clearRecord());

    const callback = (record) => {
      store.dispatch(setRecord(record));
    }

    Pride.requestRecord(datastoreUid, recordUid, callback)
  }
}

/*
  Expose functions that are useful externally
*/
export {
  initializePride,
  runSearchPride,
  switchToDatastorePride,
  isSlugADatastore,
  getDatastoreSlugByUid,
  getDatastoreUidBySlug,
  nextPage,
  prevPage,
  config,
  requestPrideRecord,
}
