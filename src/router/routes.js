import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { _ } from 'underscore';

import { store } from '../store'

import { Main } from '../modules/core'
import {
  IndexPage,
  NoMatch,
  DatastorePage,
  RecordPage
} from '../modules/pages';
import {
  isSlugADatastore,
  switchToDatastorePride,
} from '../pride-interface';

import { runSearchPride } from '../pride-interface';
import {
  setSearchQuery
} from '../modules/search';
import {
  setActiveFilters,
  clearActiveFilters,
} from '../modules/filters';

const getActiveFiltersByQuery = (query) => {
  const groups = query.split(';');
  const activeFilters = groups.reduce((map, array) => {
    const split = array.split(':');
    map[split[0]] = split[1]
    return map
  }, {})

  return activeFilters;
}

const handleDatastorePageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;
  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, DatastorePage)
  }

  const nextQuery = nextState.location.query.q;
  const query = store.getState().search.query;
  let runSearch = false;
  if (nextQuery && (query !== nextQuery)) {
    store.dispatch(setSearchQuery(nextQuery));
    runSearch = true;
  }

  const queryFilter = nextState.location.query.filter;
  if (queryFilter) {
    const nextActiveFilters = getActiveFiltersByQuery(queryFilter);
    const activeFilters = store.getState().filters.active;

    if (!_.isEqual(nextActiveFilters, activeFilters)) {
      store.dispatch(clearActiveFilters());
      store.dispatch(setActiveFilters(nextActiveFilters));
      runSearch = true;
    }
  } else {
    if (!nextState.location.query.filter && store.getState().filters.active) {
      store.dispatch(clearActiveFilters());
      runSearch = true;
    }
  }

  if (runSearch) {
    runSearchPride();
  }

  callback(null, NoMatch)
}

const handleRecordPageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;

  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, RecordPage)
  }

  callback(null, NoMatch)
}

const routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage}/>
    <Route path="/:datastore" getComponent={handleDatastorePageComponent}/>
    <Route path="/:datastore/record/:record" getComponent={handleRecordPageComponent}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);

export {
  routes,
}
