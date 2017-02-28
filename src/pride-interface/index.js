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

const handleSearchData = (data) => {
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

  const activeDatastore = store.getState().datastores.active;
  const activeRecords = store.getState().records.records[activeDatastore];

  if (activeRecords) {
    const activeRecordsLength = _.values(activeRecords).length
    const count = data.count // aka page count
    const page = data.page
    const total_available = data.total_available
    const check_last_page = (page - 1) * count + activeRecordsLength === total_available

    // Check to see if records have loaded.
    if (activeRecordsLength === count || check_last_page) {
      store.dispatch(loadingRecords(false))
    }
  }
}

const handleHoldings = (datastore_uid, record_id) => {
  return (holdings_data) => {
    console.log('holdings_data', holdings_data)

    store.dispatch(addHoldings({
      datastore_uid: datastore_uid,
      record_id: record_id,
      holdings_data: holdings_data,
    }))
  }
}

const setupObservers = (searchObj) => {
  searchObj.resultsObservers.add(function(results) {
    store.dispatch(clearRecords(searchObj.uid));

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
              holdings: {
                digital: [],
                physical: []
              }
            }
          }));

          record.getHoldings(handleHoldings(searchObj.uid, id))
        })
      }
    });

    if (store.getState().datastores.active === searchObj.uid) {
      handleSearchData(searchObj.getData())
    }
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

    const callback = (record) => {
      store.dispatch(setRecord(record));
    }

    Pride.requestRecord(datastoreUid, recordUid, callback)
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
  getMultiSearchRecords
}
