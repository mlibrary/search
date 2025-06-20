/* eslint 'camelcase': 'off' */
import {
  addAdvancedBooleanTypes,
  addAdvancedField,
  addAdvancedFilterGroups,
  addFieldedSearch
} from '../advanced';
import { addBrowseFilter, organizeByParents } from '../browse';
import { addDatastore, changeActiveDatastore } from '../datastores';
import { addFilters, clearFilters, setFilterGroupOrder } from '../filters';
import {
  addHoldings,
  addRecords,
  clearRecords,
  loadingRecords,
  setRecordHoldings
} from '../records';
import {
  getDatastoreByUid,
  getDatastoreUidBySlug,
  prideParseField
} from './utils';
import { getField, getFieldValue } from '../records/utilities';
import { renderApp, renderPrideFailedToLoad } from '../../index';
import { addSpecialists } from '../specialists';
import config from '../../config';
import { findWhere } from '../reusable/underscore';
import prejudice from '../lists/prejudice';
import { Pride } from 'pride';
import { setDefaultAffiliation } from '../affiliation';
import { setDefaultInstitution } from '../institution';
import { setSearchData } from '../search';
import { setupProfile } from '../profile';
import store from '../../store';

// Pride Internal Configuration
Pride.Settings.datastores_url = config.spectrum;
Pride.Settings.connection_attempts = 2;
Pride.Settings.obnoxious = false;

let searchSwitcher = null;

const handleSearchData = (data, datastoreUid) => {
  const {
    count,
    fields,
    page,
    selected_sort: selectedSort,
    sorts,
    specialists,
    total_available: totalAvailable,
    total_pages: totalPages
  } = data;
  const { records } = store.getState();

  if (data.specialists) {
    store.dispatch(addSpecialists(specialists));
  }

  store.dispatch(setSearchData({
    data: { count, fields, page, selectedSort, sorts, totalAvailable, totalPages },
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
  searchObj.resultsObservers.add((results) => {
    store.dispatch(clearRecords(searchObj.uid));

    // Does results contain undefined records
    if (!results.some((element) => {
      return typeof element === 'undefined';
    })) {
      const recordsHaveHoldings = searchObj.uid === 'mirlyn';

      // Build a list of records from Pride results
      const records = results.reduce((accumulator, result) => {
        result.renderFull((data) => {
          const { fields } = data;

          accumulator.push({
            ...data,
            loadingHoldings: recordsHaveHoldings || null,
            resourceAccess: getFieldValue(getField(fields, 'resource_access')) || null,
            uid: getFieldValue(getField(fields, 'id'))[0]
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
              holdings: data,
              recordUid: uid
            })
          );

          if (uid === fullRecordUid) {
            store.dispatch(setRecordHoldings(data));
          }
        };

        results.forEach((result) => {
          result.renderFull((data) => {
            const [uid] = getFieldValue(getField(data.fields, 'id'));
            result.getHoldings((datum) => {
              return holdingsCallback(searchObj.uid, uid, datum);
            });
          });
        });
      }
    }

    handleSearchData(searchObj.getData(), searchObj.uid);
  });

  searchObj.facetsObservers.add((filterGroups) => {
    const activeDatastore = store.getState().datastores.active;

    if (activeDatastore === searchObj.uid) {
      store.dispatch(clearFilters());

      // Set the filter order in state.
      store.dispatch(
        setFilterGroupOrder({
          order: filterGroups.map((fg) => {
            return fg.uid;
          })
        })
      );

      filterGroups.forEach((filterGroup) => {
        filterGroup.resultsObservers.add((filters) => {
          store.dispatch(
            addFilters({
              ...filterGroup.getData('metadata'),
              defaultValue: filterGroup.uid === 'institution' ? 'U-M Ann Arbor Libraries' : null,
              filters: filters.slice(0, 50),
              uid: filterGroup.uid
            })
          );
        });
      });
    }
  });
};

const multiSearch = (uid, muted, searchArray) => {
  const setMute = (state) => {
    searchArray.forEach((search) => {
      if (typeof search.setMute === 'function') {
        search.setMute(state);
      }
    });
  };

  const funcOnEach = (funcName, beforeFunc) => {
    return (...args) => {
      if (beforeFunc) {
        beforeFunc(...args);
      }
      searchArray.forEach((search) => {
        if (typeof search[funcName] === 'function') {
          search[funcName](...args);
        }
      });
      return true;
    };
  };

  const api = {
    nextPage: funcOnEach('nextPage'),
    prevPage: funcOnEach('prevPage'),
    run: funcOnEach('run'),
    searches: searchArray,
    set: (values) => {
      searchArray.forEach((search) => {
        if (typeof search.set === 'function') {
          search.set(values);
        }
      });
      return api;
    },
    setMute,
    uid
  };

  setMute(muted);

  return api;
};

const createSearchSwitcher = (initialSearch, cachedSearches) => {
  let currentSearch = initialSearch;
  let { uid } = currentSearch;
  const searchCache = multiSearch(null, true, cachedSearches);

  const initializeSearches = () => {
    currentSearch.setMute(false);
    currentSearch.set({ page: 1 });
    searchCache.set({ page: 1 });
  };

  const api = {
    nextPage () {
      currentSearch.nextPage();
      return api;
    },
    prevPage () {
      currentSearch.prevPage();
      return api;
    },
    run () {
      currentSearch.run(0);
      searchCache.run(0);
      return api;
    },
    set (settings) {
      currentSearch.set(settings);
      const omittedSettings = { ...settings };
      ['page', 'facets'].forEach((property) => {
        delete omittedSettings[property];
      });
      searchCache.set(omittedSettings);
      return api;
    },
    switchTo (requestedUid) {
      if (requestedUid !== uid) {
        currentSearch.setMute(true);
        currentSearch.set({ page: 1 });
        searchCache.searches.push(currentSearch);

        const newSearch = searchCache.searches.find((search) => {
          return search.uid === requestedUid;
        });
        if (!newSearch) {
          throw new Error(`Could not find a search with a UID of: ${requestedUid}`);
        }

        searchCache.searches = searchCache.searches.filter((search) => {
          return search.uid !== requestedUid;
        });
        currentSearch = newSearch;
        const { uid: newUid } = newSearch;
        uid = newUid;
        currentSearch.setMute(false);
      }
      return api;
    }
  };

  initializeSearches();

  return api;
};

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

    if (typeof foundDatastore !== 'undefined') {
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
      return Boolean(foundSearchObj);
    });

    if (multiSearchInternalObjects.length) {
      memo.push(multiSearch(multiDatastoreConfig.uid, true, multiSearchInternalObjects));
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

  searchSwitcher = createSearchSwitcher(defaultSearchObject, remainingSearchObjects);

  publicSearchObjects.forEach((searchObj) => {
    const datastore = getDatastoreByUid(searchObj.uid);
    store.dispatch(addDatastore({
      isMultisearch: typeof searchObj.searches !== 'undefined',
      name: datastore?.name,
      slug: datastore?.slug || searchObj.uid,
      uid: searchObj.uid
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
  return true;
};

const runSearch = () => {
  const { datastores, filters, institution, search } = store.getState();
  const { active: activeDatastore, datastores: list } = datastores;
  const { page, query, sort } = search;

  list.forEach((datastore) => {
    if (!datastore.isMultisearch) {
      store.dispatch(loadingRecords({ datastoreUid: datastore.uid, loading: true }));
    }
  });

  searchSwitcher.set({
    count: 10,
    facets: {
      ...filters.active[activeDatastore] || {},
      institution: institution.active || institution.defaultInstitution
    },
    field_tree: query === '*' ? {} : prideParseField('all_fields', query),
    page: page[activeDatastore] || 1,
    raw_query: query,
    sort: sort[activeDatastore]
  }).run();
};

// All available advanced fields and forced fields from config
const getPotentialbooleanField = (dsUid) => {
  const dsData = store.getState().search.data[dsUid];
  const spectrumFields = dsData?.fields || [];
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
                name: fieldExists.name
                  ? fieldExists.name
                  : fieldExists.metadata.name,
                uid: fieldExists.uid
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
              activeFilters: [],
              conditions: filterGroupConfig.conditions,
              filters: foundFilterGroup.values
                .reduce((filters, filter) => {
                  return filters.concat(filter.value);
                }, [])
                .sort(),
              groupBy: filterGroupConfig.groupBy,
              name: filterGroupConfig.name || foundFilterGroup.metadata.name,
              type: filterGroupConfig.type,
              uid: foundFilterGroup.uid
            });
          }
          /*
           * For filter groups that are configured, but not typical
           * Or in the filters available in Pride.
           */
          if (filterGroupConfig.uid === 'narrow_search') {
            const hierarchy = Pride.AllDatastores.get(dsUid).get('hierarchy');

            if (hierarchy) {
              return prev.concat({
                ...filterGroupConfig,
                activeFilters: [],
                filters: [].concat(hierarchy)
              });
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

/*
 * To setup browse
 *
 * 1) Know what datastores have a browse.
 * 2) Get from Pride a full list of filters used for browse.
 * 3) Organize filters by parents.
 * 4) Add filters to browse state.
 */

const compareFacetName = (facetA, facetB) => {
  return facetA.name.localeCompare(facetB.name, 'en', { sensitivity: 'base' });
};

const setupBrowse = () => {
  ['databases', 'onlinejournals'].forEach((datastoreUid) => {
    const facets = Pride.AllDatastores.get(datastoreUid).get('facets');
    const facet = findWhere(facets, { uid: 'academic_discipline' });
    const filters = organizeByParents(facet.values.sort(compareFacetName));

    store.dispatch(
      addBrowseFilter({
        datastoreUid,
        filter: {
          filters,
          name: facet.metadata.name,
          uid: facet.uid
        }
      })
    );
  });
};

const initializePride = () => {
  Pride.init({
    failure: () => {
      renderPrideFailedToLoad();
    },
    success: async () => {
      await setupSearches();
      await setupAdvancedSearch();
      await setupDefaultInstitution();
      await setupDefaultAffiliation();
      await setupBrowse();
      await prejudice.initialize();
      await setupProfile();
      renderApp();
    }
  });
};

export { initializePride, runSearch, switchPrideToDatastore };
