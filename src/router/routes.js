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
  getDatastoreUidBySlug
} from '../pride-interface';

import { runSearchPride } from '../pride-interface';

import {
  handleSearchQuery,
  handleFilterQuery,
} from './query';

const handleDatastorePageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;
  const activeDatastoreUid = getDatastoreUidBySlug(slug)

  // Is this route an actual datastore?
  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, DatastorePage)
  }

  const searchQuery = handleSearchQuery({
    nextQuery: nextState.location.query.q,
    query: store.getState().search.query,
  })

  const filterQuery = handleFilterQuery({
    activeDatastoreUid: activeDatastoreUid,
    filterQuery: nextState.location.query.filter,
    activeFiltersFromState: store.getState().filters.active,
  })

  // If either made dispatches to store, then
  // a new pride search is necessary
  if (searchQuery || filterQuery) {
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
