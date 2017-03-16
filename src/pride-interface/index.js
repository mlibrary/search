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
  loadingRecords,
  addHoldings,
  loadingHoldings,
} from '../modules/records';

import {
  removeQuery
} from '../router';

import {
  setSearchData,
  searching,
  clearSearch,
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

const handleSearchData = (data, datastoreUid) => {
  const payload = {
    data: {
      "count": data.count,
      "page": data.page,
      "totalPages": data.total_pages,
      "totalAvailable": data.total_available,
      "sorts": data.sorts,
      "selectedSort": data.selected_sort,
    },
    datastoreUid: datastoreUid
  }
  store.dispatch(setSearchData(payload))

  const activeDatastore = store.getState().datastores.active;
  const activeRecords = store.getState().records.records[activeDatastore];

  if (activeRecords) {
    const activeRecordsLength = _.values(activeRecords).length
    const count = data.count // page count
    const page = data.page
    const totalAvailable = data.total_available
    const lastPage = (page - 1) * count + activeRecordsLength === totalAvailable

    // Check to see if records have loaded.
    if (activeRecordsLength === count || lastPage) {
      store.dispatch(loadingRecords(false))
    }
  }
}

const handleHoldings = (datastoreUid, recordId) => {
  store.dispatch(loadingHoldings({
    loading: true,
    datastoreUid: datastoreUid,
    recordId: recordId,
  }))

  return (holdingsData) => {
    store.dispatch(addHoldings({
      datastoreUid: datastoreUid,
      recordId: recordId,
      holdingsData: holdingsData,
    }))

    store.dispatch(loadingHoldings({
      loading: false,
      datastoreUid: datastoreUid,
      recordId: recordId,
    }))
  }
}

const hasHoldings = (datastore) => {
  const fieldsConfig = _.findWhere(config.fields, { datastore: datastore })

  if (fieldsConfig.holdings) {
    return true
  }

  return false
}

const setupObservers = (searchObj) => {
  searchObj.resultsObservers.add(function(results) {
    store.dispatch(clearRecords(searchObj.uid));

    const doesHaveHoldings = hasHoldings(searchObj.uid)

    _.each(results, (record) => {
      if (record !== undefined) {
        record.renderFull((recordData) => {
          const id = _.uniqueId();

          store.dispatch(addRecord({
            id: id,
            datastore: searchObj.uid,
            data: {
              id: id,
              ...recordData,
              holdings: null
            }
          }));

          if (doesHaveHoldings) {
            record.getHoldings(handleHoldings(searchObj.uid, id))
          }
        })
      }
    });

    handleSearchData(searchObj.getData(), searchObj.uid)
  })

  searchObj.facetsObservers.add(function(filterGroups) {
    const activeDatastore = store.getState().datastores.active

    if (activeDatastore === searchObj.uid) {
      store.dispatch(clearFilters())
      filterGroups.forEach(filterGroup => {
        filterGroup.resultsObservers.add(filters => {
          filters.forEach(filter => {
            store.dispatch(addFilter(Object.assign({}, filter, {
              metadata: filterGroup.getData('metadata')
            }))) // Look at all these )s
          })
        })
      })
    }
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

  if (ds) {
    return ds.uid
  }

  return undefined;
}

const setupSearches = () => {
  const allDatastores = Pride.AllDatastores.array;
  const datastores = _.uniq(
    _.reduce(config.datastores.list, (memo, dsConfig) => {
      if (!dsConfig.datastores) {
        memo = memo.concat([`${dsConfig.uid}`])
      } else {
        memo = memo.concat(dsConfig.datastores)
      }
      return memo
    }, [])
  );

  const allSearchObjects = _.reduce(datastores, (memo, uid) => {
    const foundDatastore = _.find(allDatastores, function(ds) {
      return ds.get('uid') === uid
    })

    if (foundDatastore !== undefined) {
      const searchObj = foundDatastore.baseSearch();
      searchObj.set({count: 10}); // default page count for single result datastores
      setupObservers(searchObj)

      memo.push(searchObj)
    }

    return memo
  }, [])

  const multiSearchDatastores = _.reduce(config.datastores.list, (memo, dsConfig) => {
      if (dsConfig.datastores) {
        memo.push(dsConfig)
      }
    return memo;
  }, [])

  const multiSearchObjects = _.reduce(multiSearchDatastores, (memo, multiDatastoreConfig) => {
    const multiSearchInternalObjects = [];

    _.each(multiDatastoreConfig.datastores, (ds) => {
      const foundSearchObj = _.findWhere(allSearchObjects, { uid: ds })

      if (foundSearchObj) {
        multiSearchInternalObjects.push(foundSearchObj);
      }
    })

    if (multiSearchInternalObjects.length > 0) {
      memo.push(new Pride.Util.MultiSearch(multiDatastoreConfig.uid, true, multiSearchInternalObjects))
    }

    return memo;
  }, [])

  const publicSearchObjects = multiSearchObjects.concat(allSearchObjects);
  const defaultSearchObject = _.findWhere(publicSearchObjects, { uid: config.datastores.default })
  const remainingSearchObjects = _.reject(publicSearchObjects, (searchObj) => {
    return searchObj.uid === config.datastores.default
  })

  searchSwitcher = new Pride.Util.SearchSwitcher(
    defaultSearchObject,
    remainingSearchObjects
  )

  /* TODO
  const orderedSearchObjects = config.datastores.ordering.map(function (uid) {
    return _.findWhere(searchObjects, { uid: uid });
  })
  */

  _.each(publicSearchObjects, function (searchObj) {
    const name = getDatastoreName(searchObj.uid);
    const slug = getDatastoreSlug(searchObj.uid);

    store.dispatch(addDatastore({
      uid: searchObj.uid,
      name: name,
      slug: slug || searchObj.uid,
      isMultisearch: searchObj.searches !== undefined ? true : false,
    }))
  });
}

const setupPride = () => {
  setupSearches();
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
  const config = {
    field_tree: Pride.FieldTree.parseField('all_fields', query),
    page: page,
    facets: facets,
  };

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

    const state = store.getState();
    if (state && state.records.records[datastoreUid]) {
      const records = state.records.records[datastoreUid]
      const record = _.filter(records, (record) => {
        const idField = _.findWhere(record.fields, { uid: 'id' })
        return idField.value === recordUid
      })

      store.dispatch(setRecord(record[0]));
    } else {
      const callback = (record) => {
        store.dispatch(setRecord(record));

        /*
        console.log(record)
        record.getHoldings((holdingsData) => {
          console.log('holdingsData', datastoreUid, recordUid, holdingsData)
        })
        */
      }

      Pride.requestRecord(datastoreUid, recordUid, callback)
    }
  }
}

const getMultiSearchRecords = (activeDatastore, allRecords) => {
  const configDs = _.findWhere(config.datastores.list, { uid: activeDatastore })

  if (!configDs) {
    console.log('Config error: getMultiSearchRecords')
    return undefined;
  }

  const multiSearchRecords = _.pick(allRecords, configDs.datastores);
  const bentoBoxes = _.reduce(configDs.datastores, (memo, ds) => {
    let records = _.values(multiSearchRecords[ds]).splice(0, 3);

    memo.push({
      uid: ds,
      name: getDatastoreName(ds),
      slug: getDatastoreSlug(ds),
      records: records,
    })

    return memo;
  }, [])

  return bentoBoxes
}

const clearEverything = () => {
  removeQuery('q');
  removeQuery('filter');

  store.dispatch(clearRecords())
  store.dispatch(clearFilters())
  store.dispatch(clearSearch())
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
  getMultiSearchRecords,
  clearEverything,
}
