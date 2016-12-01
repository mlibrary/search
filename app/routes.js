import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from './components/Main'
import Default from './components/Default'
import DatastorePage from './components/datastore/DatastorePage'

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Default} /> // TODO redirect to default datastore
    <Route path="/:datastore_uid" component={DatastorePage} />
  </Route>
)
