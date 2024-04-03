import { Pride } from 'pride';
import _ from 'underscore';
import config from '../../config';
import store from '../../store';
import { renderApp, renderPrideFailedToLoad } from '../../index';
import { addDatastore, changeActiveDatastore } from '../datastores';
import {
  addRecords,
  clearRecords,
  loadingRecords,
  addHoldings,
  setRecordHoldings
} from '../records';
import { getField, getFieldValue } from '../records/utilities';
import { setSearchData, setParserMessage } from '../search';
import {
  addAdvancedField,
  addAdvancedBooleanTypes,
  addFieldedSearch,
  addAdvancedFilterGroups
} from '../advanced';
import { addFilters, clearFilters, setFilterGroupOrder } from '../filters';
import {
  getDatastoreSlug,
  getDatastoreName,
  getDatastoreUidBySlug,
  prideParseField
} from './utils';
import { setDefaultInstitution } from '../institution';
import { setDefaultAffiliation } from '../affiliation';
import { addBrowseFilter, organizeByParents } from '../browse';
import { addSpecialists } from '../specialists';
import prejudice from '../lists/prejudice';
import { addProfile } from '../profile';
import { findWhere } from '../reusable/underscore';

// Pride Internal Configuration
Object.assign(Pride.Settings, {
  datastores_url: config.spectrum,
  connection_attempts: 2,
  obnoxious: false
});

['info', 'warning', 'error'].forEach(function (type) {
  Pride.Messenger.addObserver(function (msg) {
    console.log([type, msg]);
    if (type === 'error') {
      store.dispatch(setParserMessage(msg));
    }
  }, type);
});

let searchSwitcher;

const handleSearchData = (data, datastoreUid) => {
  const { count, page, total_pages: totalPages, total_available: totalAvailable, sorts, selected_sort: selectedSort, fields, specialists } = data;

  const payload = {
    data: {
      count,
      page,
      totalPages,
      totalAvailable,
      sorts,
      selectedSort,
      fields
    },
    datastoreUid
  };

  const activeDatastore = store.getState().datastores.active;

  if (['everything', datastoreUid].includes(activeDatastore) && specialists) {
    store.dispatch(addSpecialists(specialists));
  }

  store.dispatch(setSearchData(payload));

  const records = store.getState().records.records[datastoreUid] || {};
  const recordsLength = Object.values(records).length;
  const lastPage = (page - 1) * count + recordsLength === totalAvailable;

  if (recordsLength === count || lastPage) {
    store.dispatch(loadingRecords({ datastoreUid, loading: false }));
  }
};

const setupObservers = (searchObj) => {
  // TODO: Only listen to this overserver if new search is made.
  searchObj.resultsObservers.add(function (results) {
    store.dispatch(clearRecords(searchObj.uid));

    // Does results contain undefined records
    if (!_.contains(results, undefined)) {
      const recordsHaveHoldings = searchObj.uid === 'mirlyn';

      // Build a list of records from Pride results
      const records = results.reduce((accumulator, result) => {
        result.renderFull((data) => {
          const uid = getFieldValue(getField(data.fields, 'id'))[0];
          const resourceAccess = getFieldValue(
            getField(data.fields, 'resource_access')
          );

          accumulator = accumulator.concat({
            uid,
            ...data,
            resourceAccess: resourceAccess || undefined,
            loadingHoldings: recordsHaveHoldings ? true : undefined
          });
        });

        return accumulator;
      }, []);

      // Add records to state and render them.
      store.dispatch(
        addRecords({
          datastoreUid: searchObj.uid,
          records
        })
      );

      if (recordsHaveHoldings) {
        const holdingsCallback = (dsUid, uid, data) => {
          const fullRecordUid = store.getState().records.record?.uid;

          store.dispatch(
            addHoldings({
              datastoreUid: dsUid,
              recordUid: uid,
              holdings: data
            })
          );

          // If the result holdings in the callback need
          // to be used in the full record.
          // A record from results is stored seperate from
          // a full record.
          if (uid === fullRecordUid) {
            store.dispatch(setRecordHoldings(data));
          }
        };

        _.each(results, (result) => {
          result.renderFull((data) => {
            const uid = getFieldValue(getField(data.fields, 'id'))[0];

            result.getHoldings((data) => {
              return holdingsCallback(searchObj.uid, uid, data);
            }
            );
          });
        });
      }
    }

    handleSearchData(searchObj.getData(), searchObj.uid);
  });

  searchObj.facetsObservers.add(function (filterGroups) {
    const activeDatastore = store.getState().datastores.active;

    if (activeDatastore === searchObj.uid) {
      store.dispatch(clearFilters());

      /*
        Set the filter order in state.
      */
      store.dispatch(
        setFilterGroupOrder({
          order: filterGroups.map((fg) => {
            return fg.uid;
          })
        })
      );

      filterGroups.forEach((filterGroup) => {
        filterGroup.resultsObservers.add((filters) => {
          const metadata = filterGroup.getData('metadata');

          let defaultValue;
          if (filterGroup.uid === 'institution') {
            defaultValue = 'U-M Ann Arbor Libraries';
          }

          store.dispatch(
            addFilters({
              ...metadata,
              uid: filterGroup.uid,
              defaultValue,
              filters: filters.slice(0, 50)
            })
          );
        });
      });
    }
  });
};

class MultiSearch {
  constructor (uid, muted, searchArray) {
    this.searches = searchArray;
    this.uid = uid;
    this.muted = muted;
    this.setMute(muted);
  }

  setMute = (state) => {
    this.muted = state;
    this.searches.forEach((search) => {
      if (typeof search.setMute === 'function') {
        search.setMute(state);
      }
    });
  };

  getMute = () => {
    return this.muted;
  };

  set = (values) => {
    this.searches.forEach((search) => {
      if (typeof search.set === 'function') {
        search.set(values);
      }
    });
    return this;
  };

  funcOnEach = (funcName, beforeFunc) => {
    return (...args) => {
      beforeFunc?.call(this, ...args);
      this.searches.forEach((search) => {
        if (typeof search[funcName] === 'function') {
          search[funcName](...args);
        }
      });
      return this;
    };
  };

  run = this.funcOnEach('run');
  nextPage = this.funcOnEach('nextPage');
  prevPage = this.funcOnEach('prevPage');
}

class SearchSwitcher {
  constructor (currentSearch, cachedSearches) {
    this.currentSearch = currentSearch;
    this.searchCache = new MultiSearch(null, true, cachedSearches);
    this.uid = currentSearch.uid;

    this._initializeSearches();
  }

  _initializeSearches () {
    this.currentSearch.setMute(false);
    this.currentSearch.set({ page: 1 });
    this.searchCache.set({ page: 1 });
  }

  run (cacheSize) {
    this.currentSearch.run(cacheSize);
    this.searchCache.run(0);
    return this;
  }

  set (settings) {
    this.currentSearch.set(settings);
    const omittedSettings = { ...settings };
    ['page', 'facets'].forEach((property) => {
      delete omittedSettings[property];
    });
    this.searchCache.set(omittedSettings);
    return this;
  }

  nextPage () {
    this.currentSearch.nextPage();
    return this;
  }

  prevPage () {
    this.currentSearch.prevPage();
    return this;
  }

  switchTo (requestedUid) {
    if (requestedUid !== this.currentSearch.uid) {
      this.currentSearch.setMute(true);
      this.currentSearch.set({ page: 1 });
      this.searchCache.searches.push(this.currentSearch);

      const newSearch = this.searchCache.searches.find((search) => {
        return search.uid === requestedUid;
      });
      if (!newSearch) {
        throw new Error(`Could not find a search with a UID of: ${requestedUid}`);
      }

      this.searchCache.searches = this.searchCache.searches.filter((search) => {
        return search.uid !== requestedUid;
      });
      this.currentSearch = newSearch;
      this.uid = this.currentSearch.uid;
      this.currentSearch.setMute(false);
    }

    return this;
  }
}

const setupSearches = () => {
  const allDatastores = Pride.AllDatastores.array;
  const datastores = _.uniq(
    _.reduce(
      config.datastores.list,
      (memo, dsConfig) => {
        if (!dsConfig.datastores) {
          memo = memo.concat([`${dsConfig.uid}`]);
        } else {
          memo = memo.concat(dsConfig.datastores);
        }
        return memo;
      },
      []
    )
  );

  const allSearchObjects = _.reduce(
    datastores,
    (memo, uid) => {
      const foundDatastore = _.find(allDatastores, function (ds) {
        return ds.get('uid') === uid;
      });

      if (foundDatastore !== undefined) {
        const searchObj = foundDatastore.baseSearch();

        searchObj.set({ count: 10 }); // default page count for single result datastores
        setupObservers(searchObj);

        memo.push(searchObj);
      }

      return memo;
    },
    []
  );

  const multiSearchDatastores = _.reduce(
    config.datastores.list,
    (memo, dsConfig) => {
      if (dsConfig.datastores) {
        memo.push(dsConfig);
      }
      return memo;
    },
    []
  );

  const multiSearchObjects = _.reduce(
    multiSearchDatastores,
    (memo, multiDatastoreConfig) => {
      const multiSearchInternalObjects = [];

      _.each(multiDatastoreConfig.datastores, (ds) => {
        const foundSearchObj = findWhere(allSearchObjects, { uid: ds });

        if (foundSearchObj) {
          multiSearchInternalObjects.push(foundSearchObj);
        }
      });

      if (multiSearchInternalObjects.length > 0) {
        memo.push(
          new MultiSearch(
            multiDatastoreConfig.uid,
            true,
            multiSearchInternalObjects
          )
        );
      }

      return memo;
    },
    []
  );

  const publicSearchObjects = multiSearchObjects.concat(allSearchObjects);
  const defaultSearchObject = findWhere(publicSearchObjects, {
    uid: config.datastores.default
  });
  const remainingSearchObjects = _.reject(publicSearchObjects, (searchObj) => {
    return searchObj.uid === config.datastores.default;
  });

  searchSwitcher = new SearchSwitcher(
    defaultSearchObject,
    remainingSearchObjects
  );

  _.each(publicSearchObjects, function (searchObj) {
    const name = getDatastoreName(searchObj.uid);
    const slug = getDatastoreSlug(searchObj.uid);
    const ds = {
      uid: searchObj.uid,
      name,
      slug: slug || searchObj.uid,
      isMultisearch: searchObj.searches !== undefined
    };

    store.dispatch(addDatastore(ds));
  });
};

const switchPrideToDatastore = (slug) => {
  const uid = getDatastoreUidBySlug(slug);

  if (uid && searchSwitcher) {
    store.dispatch(changeActiveDatastore(uid));
    searchSwitcher.switchTo(uid);
  }
};

const runSearch = () => {
  const state = store.getState();
  const { query } = state.search;

  const statePage = state.search.page[state.datastores.active];
  const page = statePage || 1;
  let facets = state.filters.active[state.datastores.active] || {};
  const sort = state.search.sort[state.datastores.active];
  let fieldTree;

  if (query === '*') {
    fieldTree = {}; // search all
  } else {
    fieldTree = prideParseField('all_fields', query);
  }

  // Inject library/institution filter with facets.
  // The backend whitelists facets, so
  // the FE can always includes the institution in
  // a search. This is useful and allows including
  // institution in an Everything search so that
  // catalog works as expect, but other datastores
  // can ignore it.
  // For more background: SEARCH-871
  facets = {
    ...facets,
    institution: state.institution.active || state.defaultInstitution
  };

  const prideConfig = {
    field_tree: fieldTree,
    raw_query: query,
    page,
    facets,
    sort,
    count: 10
  };

  const datastores = state.datastores.datastores;

  datastores.forEach((datastore) => {
    if (!datastore.isMultisearch) {
      store.dispatch(
        loadingRecords({
          datastoreUid: datastore.uid,
          loading: true
        })
      );
    }
  });
  searchSwitcher.set(prideConfig).run();
};

// All available advanced and forced fields from config
const getPotentialBooleanField = (dsUid) => {
  const spectrumFields = store.getState().search.data[dsUid]?.fields ?? [];
  const configForcedFields = config.advanced[dsUid].forcedFields ?? [];
  return spectrumFields.concat(configForcedFields);
};

const setupAdvancedSearch = () => {
  // Setup Fields
  const dsConfigs = Object.keys(config.advanced);

  // Setup advanced boolean types
  store.dispatch(addAdvancedBooleanTypes(config.advancedBooleanTypes));

  dsConfigs.forEach((dsUid) => {
    // Setup Advanced Fields
    if (config.advanced[dsUid].fields) {
      config.advanced[dsUid].fields.forEach((fieldUid) => {
        const fields = getPotentialBooleanField(dsUid);
        const fieldExists = findWhere(fields, { uid: fieldUid });

        if (fieldExists) {
          store.dispatch(
            addAdvancedField({
              datastoreUid: dsUid,
              field: {
                uid: fieldExists.uid,
                name: fieldExists.name
                  ? fieldExists.name
                  : fieldExists.metadata.name
              }
            })
          );
        }
      });

      // Setup default fields
      config.advanced[dsUid].defaultFields.forEach((fieldUid) => {
        store.dispatch(
          addFieldedSearch({
            datastoreUid: dsUid,
            field: fieldUid
          })
        );
      });
    }

    // Setup Advanced Filters
    if (config.advanced[dsUid].filters) {
      const availableFilterGroups = Pride.AllDatastores.get(dsUid).get(
        'facets'
      );
      const configuredFilterGroups = config.advanced[dsUid].filters.reduce(
        (prev, filterGroupConfig) => {
          const foundFilterGroup = findWhere(availableFilterGroups, {
            uid: filterGroupConfig.uid
          });

          if (foundFilterGroup) {
            return prev.concat({
              uid: foundFilterGroup.uid,
              name: filterGroupConfig.name || foundFilterGroup.metadata.name,
              type: filterGroupConfig.type,
              conditions: filterGroupConfig.conditions,
              groupBy: filterGroupConfig.groupBy,
              filters: foundFilterGroup.values
                .reduce((filters, filter) => {
                  return filters.concat(filter.value);
                }, [])
                .sort(),
              activeFilters: []
            });
          } else {
            // for filter groups that are configured, but not typical
            // or in the filters available in Pride.
            if (filterGroupConfig.uid === 'narrow_search') {
              const hierarchy = Pride.AllDatastores.get(dsUid).get('hierarchy');

              if (hierarchy) {
                return prev.concat({
                  ...filterGroupConfig,
                  filters: [].concat(hierarchy),
                  activeFilters: []
                });
              }
            }
          }
          return prev;
        },
        []
      );

      if (configuredFilterGroups.length > 0) {
        store.dispatch(
          addAdvancedFilterGroups({
            datastoreUid: dsUid,
            filterGroups: configuredFilterGroups
          })
        );
      }
    }
  });
};

const setupBrowse = () => {
  ['databases', 'onlinejournals'].forEach((datastoreUid) => {
    const facets = Pride.AllDatastores.get(datastoreUid).get('facets');
    const facet = facets.find((f) => {
      return f.uid === 'academic_discipline';
    });
    const compareFacetName = (a, b) => {
      return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
    };

    store.dispatch(addBrowseFilter({
      datastoreUid,
      filter: {
        uid: facet.uid,
        name: facet.metadata.name,
        filters: organizeByParents(facet.values.sort(compareFacetName))
      }
    }));
  });
};

/*
  Initialize Pride kicks off Pride's internal init and checks if
  communication with the back-end (Spectrum) is established.
*/
const initializePride = () => {
  Pride.init({
    success: () => {
      setupSearches();
      setupAdvancedSearch();
      store.dispatch(setDefaultInstitution(Pride.Settings.default_institution));
      store.dispatch(setDefaultAffiliation(Pride.Settings.affiliation));
      setupBrowse();
      renderApp();
      prejudice.initialize();
      // Setup profile
      prejudice.instance.addProfileObserver((data) => {
        store.dispatch(addProfile(data));
      });
    },
    failure: () => {
      renderPrideFailedToLoad();
      console.log('Pride failed to load.');
    }
  });
};

export { runSearch, initializePride, switchPrideToDatastore };
