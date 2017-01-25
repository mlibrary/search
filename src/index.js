import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './routes';

const router = (
  <Router history={browserHistory} routes={routes} />
);

const renderApp = () => {
  ReactDOM.render(router, document.getElementById('root'))
}

//store.subscribe(renderApp)
renderApp()
