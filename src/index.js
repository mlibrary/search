import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { connect, Provider } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import './stylesheets/colors.css';
import './stylesheets/main.css';
import './stylesheets/utilities.css';
import { Alert } from './modules/reusable';
import {
  initializePride,
  isSlugADatastore,
  URLSearchQueryWrapper,
  getStateFromURL
} from './modules/pride';
import {
  NoMatch,
  DatastorePage,
  AccessibilityPage,
  AboutLibrarySearch
} from './modules/pages';
import store from './store';
import history from './history';
import { Footer, ScrollToTop, SearchHeader } from './modules/core';
import { A11yLiveMessage } from './modules/a11y';
import PropTypes from 'prop-types';

/*
 * Connected Switch: Quirk/Bugfix
 *
 * Why does it help to connect Switch?
 * Because it passes down the location prop which
 * is then used by Route instead of context.
 *
 * Details:
 * https://github.com/ReactTraining/react-router/issues/5072#issuecomment-300636461
 */
const mapStateToProps = (state) => {
  return { location: state.router.location };
};
const ConnectedSwitch = connect(mapStateToProps)(Switch);

function App () {
  return (
    <Provider store={store}>
      <div className='site-wrapper'>
        <A11yLiveMessage />
        <ConnectedRouter history={history}>
          <ScrollToTop />
          <SearchHeader />
          <ConnectedSwitch>
            <Route
              path='/librarywebsite'
              render={({ location }) => {
                return (
                  <Redirect
                    to={{
                      ...location,
                      pathname: location.pathname.replace(/librarywebsite/, 'guidesandmore')
                    }}
                  />
                );
              }}
            />
            <Route path='/about-library-search' exact component={AboutLibrarySearch} />
            <Route
              path='/technical-overview' exact render={() => {
                return (
                  <Redirect to='/about-library-search' />
                );
              }}
            />
            <Route path='/accessibility' exact component={AccessibilityPage} />
            <Route
              path='/' exact render={() => {
                return (
                  <Redirect to='/everything' />
                );
              }}
            />
            <Route
              path='/:datastoreSlug' render={(props) => {
                const isDatastore = isSlugADatastore(props.match.params.datastoreSlug);
                const urlState = getStateFromURL({
                  location: props.location
                });

                return (
                  isDatastore && urlState
                    ? (
                      <URLSearchQueryWrapper>
                        <DatastorePage {...props} />
                      </URLSearchQueryWrapper>
                      )
                    : (
                      <NoMatch />
                      )
                );
              }}
            />
            <Route component={NoMatch} />
          </ConnectedSwitch>
          <Footer />
        </ConnectedRouter>
      </div>
    </Provider>
  );
}

App.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
};

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />);
};

const renderPrideFailedToLoad = () => {
  root.render(
    <Alert type='error'>
      U-M Library Search is not available. We will fix this issue as soon as we can.
    </Alert>
  );
};

initializePride();

export {
  renderApp,
  renderPrideFailedToLoad
};
