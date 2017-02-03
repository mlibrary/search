import React from 'react';
import { IndexRoute, Route } from 'react-router';

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

const handleDatastorePageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;

  // 1. Validate datastore
  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, DatastorePage)
  }

  // 2. Check for query params
  const { q } = nextState.location.query;

  if (q) {
    console.log('query', q)
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
