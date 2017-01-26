import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';

import { store } from './store'
import { initializePride } from './pride-interface';
import routes from './routes';

const router = (
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);

const renderApp = () => {
  ReactDOM.render(router, document.getElementById('root'))
}

initializePride();
renderApp();
