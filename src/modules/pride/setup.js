import { Pride } from 'pride';
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
  getDatastoreByUid,
  getDatastoreUidBySlug,
  prideParseField
} from './utils';
import { setDefaultInstitution } from '../institution';
import { setDefaultAffiliation } from '../affiliation';
import { addBrowseFilter, organizeByParents } from '../browse';
import { addSpecialists } from '../specialists';
import prejudice from '../lists/prejudice';
import { setupProfile } from '../profile';
import { findWhere } from '../reusable/underscore';

/*
  Pride Internal Configuration
*/
Pride.Settings.datastores_url = config.spectrum;
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false; // Console log messages

Pride.Messenger.addObserver(function (msg) {
  console.log(['info', msg]);
}, 'info');
Pride.Messenger.addObserver(function (msg) {
  console.log(['warning', msg]);
}, 'warning');
Pride.Messenger.addObserver(function (msg) {
  console.log(['error', msg]);

  store.dispatch(setParserMessage(msg));
}, 'error');

let searchSwitcher;

const handleSearchData = (data, datastoreUid) => {
  const {
    specialists,
    count,
    page,
    total_pages: totalPages,
    total_available: totalAvailable,
    sorts,
    selected_sort: selectedSort,
    fields
  } = data;
  const { datastores, records } = store.getState();
  const { active: activeDatastore } = datastores;

  if (['everything', activeDatastore].includes(datastoreUid) && specialists) {
    store.dispatch(addSpecialists(specialists));
  }

  store.dispatch(setSearchData({
    data: { count, page, totalPages, totalAvailable, sorts, selectedSort, fields },
    datastoreUid
  }));

  const datastoreRecords = records.records[datastoreUid] || [];
  const recordsLength = Object.values(datastoreRecords).length;
  const lastPage = (page - 1) * count + recordsLength === totalAvailable;

  // Check to see if records have loaded.
  if (recordsLength === count || lastPage) {
    store.dispatch(
      loadingRecords({
        datastoreUid,
        loading: false
      })
    );
  }
};

const setupObservers = (searchObj) => {
  searchObj.resultsObservers.add(function (results) {
    store.dispatch(clearRecords(searchObj.uid));

    // Does results contain undefined records
    if (!results.includes(undefined)) {
      const recordsHaveHoldings = searchObj.uid === 'mirlyn';

      // Build a list of records from Pride results
      const records = results.reduce((accumulator, result) => {
        result.renderFull((data) => {
          const { fields } = data;
    
          accumulator.push({
            uid: getFieldValue(getField(fields, 'id'))[0],
            ...data,
            resourceAccess: getFieldValue(getField(fields, 'resource_access')) || undefined,
            loadingHoldings: recordsHaveHoldings || undefined
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

        results.forEach((result) => {
          result.renderFull((data) => {
            const uid = getFieldValue(getField(data.fields, 'id'))[0];
            result.getHoldings((data) => {
              return holdingsCallback(searchObj.uid, uid, data);
            });
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
  const { list, default: defaultDatastore } = config.datastores;
  const datastores = Array.from(new Set(
    list.reduce((memo, datastore) => {
      return memo.concat(datastore.datastores || `${datastore.uid}`);
    }, [])
  ));
  const allDatastores = Pride.AllDatastores.array;

  const allSearchObjects = datastores.reduce((memo, uid) => {
    const foundDatastore = allDatastores.find((datastore) => {
      return datastore.get('uid') === uid;
    });
  
    if (foundDatastore !== undefined) {
      const searchObj = foundDatastore.baseSearch();
      searchObj.set({ count: 10 });
      setupObservers(searchObj);
      memo.push(searchObj);
    }
  
    return memo;
  }, []);

  const multiSearchDatastores = list.filter((datastore) => {
    return datastore.datastores;
  });

  const multiSearchObjects = multiSearchDatastores.reduce((memo, multiDatastoreConfig) => {
    const multiSearchInternalObjects = multiDatastoreConfig.datastores.map((datastore) => {
      return allSearchObjects.find((searchObj) => {
        return searchObj.uid === datastore;
      });
    }).filter((foundSearchObj) => {
      return !!foundSearchObj;
    });
  
    if (multiSearchInternalObjects.length) {
      memo.push(new MultiSearch(multiDatastoreConfig.uid, true, multiSearchInternalObjects));
    }
  
    return memo;
  }, []);

  const publicSearchObjects = multiSearchObjects.concat(allSearchObjects);
  const defaultSearchObject = publicSearchObjects.find((searchObj) => {
    return searchObj.uid === defaultDatastore;
  });
  const remainingSearchObjects = publicSearchObjects.filter((searchObj) => {
    return searchObj.uid !== defaultDatastore;
  });

  searchSwitcher = new SearchSwitcher(
    defaultSearchObject,
    remainingSearchObjects
  );

  publicSearchObjects.forEach((searchObj) => {
    const datastore = getDatastoreByUid(searchObj.uid);
    store.dispatch(addDatastore({
      uid: searchObj.uid,
      name: datastore?.name,
      slug: datastore?.slug || searchObj.uid,
      isMultisearch: searchObj.searches !== undefined
    }));
  });
};

const switchPrideToDatastore = (slug) => {
  const uid = getDatastoreUidBySlug(slug);

  if (!uid || !searchSwitcher) {
    return false;
  }

  store.dispatch(changeActiveDatastore(uid));
  searchSwitcher.switchTo(uid);
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

// All available advanced fields and
// forced fields from config
const getPotentialbooleanField = (dsUid) => {
  const dsData = store.getState().search.data[dsUid];
  const spectrumFields = dsData ? dsData.fields : [];
  const dsForcedFields = config.advanced[dsUid].forcedFields;
  const configForcedFields = dsForcedFields || [];
  const potentialbooleanField = spectrumFields.concat(configForcedFields);

  return potentialbooleanField;
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
        const fields = getPotentialbooleanField(dsUid);
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

const setupDefaultInstitution = () => {
  store.dispatch(setDefaultInstitution(Pride.Settings.default_institution));
};

const setupDefaultAffiliation = () => {
  store.dispatch(setDefaultAffiliation(Pride.Settings.affiliation));
};

const compareFacetName = (a, b) => {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }

  return comparison;
};

/*
    To setup browse

    1) Know what datastores have a browse.
    2) Get from Pride a full list of filters used for browse.
    3) Organize filters by parents.
    4) Add filters to browse state.
  */

const setupBrowse = () => {
  ['databases', 'onlinejournals'].forEach((datastoreUid) => {
    const facets = Pride.AllDatastores.get(datastoreUid).get('facets');
    const facet = findWhere(facets, { uid: 'academic_discipline' });
    const filters = organizeByParents(facet.values.sort(compareFacetName));

    store.dispatch(
      addBrowseFilter({
        datastoreUid,
        filter: {
          uid: facet.uid,
          name: facet.metadata.name,
          filters
        }
      })
    );
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
      setupDefaultInstitution();
      setupDefaultAffiliation();
      setupBrowse();
      renderApp();
      prejudice.initialize();
      setupProfile();
    },
    failure: () => {
      renderPrideFailedToLoad();
      console.log('Pride failed to load.');
    }
  });
};

export { runSearch, initializePride, switchPrideToDatastore };
