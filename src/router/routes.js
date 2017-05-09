import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { _ } from 'underscore';

import { store } from '../store'
import { Main } from '../modules/core'
import {
  IndexPage,
  NoMatch,
  DatastorePage,
  RecordPage,
  AdvancedPage,
} from '../modules/pages';
import {
  isSlugADatastore,
  switchToDatastorePride,
  getDatastoreUidBySlug,
  config,
} from '../pride-interface';
import { changeActiveDatastore } from '../modules/datastores';

const handleDatastorePageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;

  // Is this route an actual datastore?
  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, DatastorePage)
  }

  callback(null, NoMatch)
}

const handleAdvancedPageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;

  // Is this route an actual datastore?
  if (isSlugADatastore(slug)) {
    switchToDatastorePride(slug)
    callback(null, AdvancedPage)
  }

  callback(null, NoMatch)
}

const handleRecordPageComponent = (nextState, callback) => {
  const slug = nextState.params.datastore;
  if (isSlugADatastore(slug)) {
    const datastoreUid = getDatastoreUidBySlug(slug)
    store.dispatch(changeActiveDatastore(datastoreUid))
    callback(null, RecordPage)
  }

  callback(null, NoMatch)
}

const handleIndexRoute = (nextState, replace) => {
  replace(`/${config.datastores.default}`);
}

const routes = (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage} onEnter={handleIndexRoute}/>
    <Route path="/:datastore" getComponent={handleDatastorePageComponent}/>
    <Route path="/:datastore/advanced" getComponent={handleAdvancedPageComponent}/>
    <Route path="/:datastore/record/:record" getComponent={handleRecordPageComponent}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);

export {
  routes,
}
