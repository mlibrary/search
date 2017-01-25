import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Main } from './modules/core'
import { IndexPage, NoMatch, DatastorePage, RecordPage } from './modules/pages';

export default (
  <Route path="/" component={Main}>
    <IndexRoute component={IndexPage}/>
    <Route path="/:datastore" component={DatastorePage}/>
    <Route path="/:datastore/record/:record" component={RecordPage}/>
    <Route path="*" component={NoMatch}/>
  </Route>
);
