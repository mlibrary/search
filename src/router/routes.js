import React from 'react';
import { IndexRoute, Route } from 'react-router';

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

const handleDatastorePageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;

  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, DatastorePage)
  }

  const next_query = nextState.location.query.q;
  const query = store.getState().search.query;

  let runSearch = false;

  if (next_query && (query !== next_query)) {
    store.dispatch(setSearchQuery(next_query));
    runSearch = true;
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
