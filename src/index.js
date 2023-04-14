import 'react-app-polyfill/ie11';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  connect,
  Provider
} from 'react-redux';
import {
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import {
  ConnectedRouter
} from 'connected-react-router';
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
import {
  Main,
  ScrollToTop
} from './modules/core';
import {
  A11yLiveMessage
} from './modules/a11y';
import {
  handleGAClick
} from './modules/analytics';
import ReactGA from 'react-ga';

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
const ConnectedSwitch = connect(mapStateToProps)(Routes);

class App extends React.Component {
  constructor (props) {
    super(props);
    ReactGA.initialize('UA-1341620-18');
  }

  render () {
    return (
      <Provider store={store}>
        <div className='site-wrapper' onClick={handleGAClick}>
          <A11yLiveMessage />
          <ConnectedRouter history={history}>
            <ScrollToTop>
              <Main>
                <ConnectedSwitch>
                  <Route
                    path='/librarywebsite' render={({ location }) => {
                      return (
                        <Navigate
                          to={{
                            ...location,
                            pathname: location.pathname.replace(/librarywebsite/, 'guidesandmore')
                          }}
                          replace
                        />
                      );
                    }}
                  />
                  <Route path='/about-library-search' exact component={AboutLibrarySearch} />
                  <Route
                    path='/technical-overview' exact render={() => {
                      return (
                        <Navigate to='/about-library-search' replace />
                      );
                    }}
                  />
                  <Route path='/accessibility' exact component={AccessibilityPage} />
                  <Route
                    path='/' exact render={() => {
                      return (
                        <Navigate to='/everything' replace />
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
              </Main>
            </ScrollToTop>
          </ConnectedRouter>
        </div>
      </Provider>
    );
  }
}

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
};

const renderPrideFailedToLoad = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
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
