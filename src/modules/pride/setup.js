import { Pride } from 'pride'
import { _ } from 'underscore'

import config from '../../config'
import store from '../../store'
import {
  renderApp
} from '../../index'

import {
  addDatastore,
  changeActiveDatastore
} from '../datastores'

import {
  addRecord,
  clearRecords,
  loadingRecords,
  addHoldings,
  loadingHoldings,
} from '../records';

import {
  setSearchData,
  searching,
} from '../search';

import {
  addFilter,
  clearFilters,
} from '../filters';

import {
  getDatastoreSlug,
  getDatastoreName,
  getDatastoreUidBySlug,
} from './utils'

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
      "fields": data.fields,
    },
    datastoreUid: datastoreUid
  }

  store.dispatch(setSearchData(payload))

  const records = store.getState().records.records[datastoreUid];
  const recordsLength = _.values(records).length
  const count = data.count // page count
  const page = data.page
  const totalAvailable = data.total_available
  const lastPage = (page - 1) * count + recordsLength === totalAvailable

  // Check to see if records have loaded.
  if (recordsLength === count || lastPage) {
    store.dispatch(loadingRecords({
      datastoreUid,
      loading: false
    }))
  }
}

const handleHoldings = (datastoreUid, recordId) => {
  store.dispatch(loadingHoldings({
    loading: true,
    datastoreUid: datastoreUid,
    recordId: recordId,
  }))

  return (holdingsData) => {
    //console.log('holdingsData', datastoreUid, recordId, holdingsData)

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

        // Does the filter configuration request that this
        // filter group be used and displayed.
        if (_.findWhere(config.filters[searchObj.uid], { uid: filterGroup.uid })) {

          filterGroup.resultsObservers.add(filters => {
            filters.forEach(filter => {
              const metadata = filterGroup.getData('metadata')

              store.dispatch(addFilter(Object.assign({}, filter, {
                metadata: metadata
              }))) // Look at all these )s
            })
          })
        } // end of config filter group check
      }) // end of for each filterGroup
    } // end of only listen to filter groups from active datastore
  }) // end of facet observer
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

  _.each(publicSearchObjects, function (searchObj) {
    const name = getDatastoreName(searchObj.uid);
    const slug = getDatastoreSlug(searchObj.uid);
    const ds = {
      uid: searchObj.uid,
      name: name,
      slug: slug || searchObj.uid,
      isMultisearch: searchObj.searches !== undefined ? true : false,
    }

    store.dispatch(addDatastore(ds))
  });
}

const switchPrideToDatastore = (slug) => {
  const uid = getDatastoreUidBySlug(slug)

  if (!uid) {
    return false
  }

  if (!searchSwitcher) {
    return false
  }

  store.dispatch(changeActiveDatastore(uid))
  searchSwitcher.switchTo(uid)
}

const runSearch = () => {
  const state = store.getState()
  const { query } = state.search
  const statePage = state.search.page[state.datastores.active]
  const page = statePage ? statePage : 1
  const facets = state.filters.active[state.datastores.active] || {}
  const config = {
    field_tree: Pride.FieldTree.parseField('all_fields', query),
    page,
    facets
  }
  store.dispatch(searching(true))
  const datastores = store.getState().datastores.datastores

  datastores.forEach(datastore => {
    if (!datastore.isMultisearch) {
      store.dispatch(loadingRecords({
        datastoreUid: datastore.uid,
        loading: true
      }))
    }
  })
  searchSwitcher.set(config).run();
}

/*
  Initialize Pride kicks off Pride's internal init and checks if
  communication with the back-end (Spectrum) is established.
*/
const initializePride = () => {
  Pride.init({
    success: () => {
      setupSearches();
      renderApp();
    },
    failure: () => {
      console.log("Pride failed to load.");
    },
  });
}

export {
  runSearch,
  initializePride,
  switchPrideToDatastore
}
