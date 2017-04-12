import { Pride } from 'pride';
import { _ } from 'underscore';
import { browserHistory } from 'react-router';

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
  setRecordHoldings,
} from '../modules/records';

import {
  removeQuery,
  addQuery,
} from '../router';

import {
  setSearchData,
  searching,
  clearSearch,
  setSearchQuery
} from '../modules/search';

import {
  renderApp,
} from '../index';

import {
  addFilter,
  clearFilters,
  addActiveFilter,
  clearAllFilters,
} from '../modules/filters';

import {
  getFacetsForPride
} from './utilities'

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

const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

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

const handleStoreToUrlSync = ({ query, filters }) => {

  if (query) {
    // Example:
    // query=parrots
    addQuery({
      'query': query
    })
  }

  if (filters) {
    // example:
    // search_only=false;subject:Birds|Parrots
    const filtersQueryArray = _.map(filters, (filter) => {
      return `${filter.uid}:${filter.filters.join('|')}`
    }, [])

    addQuery({
      'filter': filtersQueryArray.join(';')
    })
  }
}

const runSearchPride = () => {
  const state = store.getState();
  const query = state.search.query;
  const page = state.search.page;
  const facets = getFacetsForPride({
    filters: state.filters.active[state.datastores.active],
  })

  const config = {
    field_tree: Pride.FieldTree.parseField('all_fields', query),
    page: page,
    facets: facets,
  };
  const activeDatastoreUid = state.datastores.active

  // redirect to the active datastore on submit
  browserHistory.push(`/${getDatastoreSlugByUid(activeDatastoreUid)}`)

  handleStoreToUrlSync({
    query,
    filters: state.filters.active[activeDatastoreUid]
  })

  store.dispatch(searching(true))
  store.dispatch(loadingRecords(true))
  searchSwitcher.set(config).run();
}

const setupInitialState = () => {
  /*
    Look for state in URL
    - Search query and filters
  */
  const query = getUrlParameter('query')
  const filters = getUrlParameter('filter')
  const stateFilters = store.getState().filters.groups

  let runSearch = false

  // If query in URL
  if (query) {
    store.dispatch(setSearchQuery(query))
    runSearch = true
  }

  // If filters in URL
  if (filters) {
    const filterGroups = filters.split(';');

    _.each(filterGroups, (group) => {
      const split = group.split(':');

      if (split[0] && split[1]) {
        const activeDatastoreUid = store.getState().datastores.active
        const group = split[0]
        const filterValues = split[1].split('|')

        if (stateFilters[group]) {
          _.each(filterValues, (value) => {
            store.dispatch(addActiveFilter({
              datastoreUid: activeDatastoreUid,
              filterUid: group,
              filterName: stateFilters[group].name,
              filterItemValue: value
            }))
          })
        }
      }
    })
  }

  if (runSearch) {
    runSearchPride()
  }
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
      setupInitialState()
    },
    failure: () => {
      console.log("Pride failed to load.");
    },
  });
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

  /*
    Check if record is in state, just use that if it is.
    - But also check if it has holdings or is expecting holdings.

    If not in state, then ask Pride for record and ask for holdings.
  */

  const getRecordFromPride = () => {
    const callback = (record) => {
      store.dispatch(setRecord(record));
    }

    // We only want to send holdings requests for
    // record types that have holdings (e.g. the catalog)
    if (hasHoldings(datastoreUid)) {
      Pride.requestRecord(datastoreUid, recordUid, callback).getHoldings((holdings) => {
        store.dispatch(setRecordHoldings(holdings))
      })
    } else {
      Pride.requestRecord(datastoreUid, recordUid, callback)
    }
  }

  // Required params
  if (datastoreUid && recordUid) {
    store.dispatch(clearRecord());
    const records = store.getState().records.records[datastoreUid];

    // Does state have records for this datastore?
    // This likely means the user is coming from a results page and we
    // already have this record data.
    if (records) {
      // Look up this specific record
      const record = _.filter(records, (record) => {
        const idField = _.findWhere(record.fields, { uid: 'id' })
        return idField.value === recordUid
      })

      const recordNeedsToRequestHoldings = (record && !record[0].holdings && hasHoldings(datastoreUid))

      if (recordNeedsToRequestHoldings) {
        getRecordFromPride()
      } else {
        store.dispatch(setRecord(record[0]));
      }
    } else {
      // No records in state for this datastore,
      // so we need to ask Pride for this record
      getRecordFromPride()
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
  removeQuery('query');
  removeQuery('filter');

  store.dispatch(clearRecords())
  store.dispatch(clearAllFilters())
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
  getDatastoreName,
  nextPage,
  prevPage,
  config,
  requestPrideRecord,
  getMultiSearchRecords,
  clearEverything,
}
