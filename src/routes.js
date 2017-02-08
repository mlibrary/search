import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { store } from './store'

import { Main } from './modules/core'
import {
  IndexPage,
  NoMatch,
  DatastorePage,
  RecordPage
} from './modules/pages';
import {
  isSlugADatastore,
  switchToDatastorePride,
} from './pride-interface';

import { runSearchPride } from './pride-interface';
import { setSearchQuery } from './modules/search';

const handleDatastorePageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;

  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, DatastorePage)
  }

  const next_q = nextState.location.query.q;
  const q = store.getState().search.query;

  if (next_q && (q !== next_q)) {
    store.dispatch(setSearchQuery(next_q));
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

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage}/>
    <Route path="/:datastore" getComponent={handleDatastorePageComponent}/>
    <Route path="/:datastore/record/:record" getComponent={handleRecordPageComponent}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);
