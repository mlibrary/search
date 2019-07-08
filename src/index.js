import 'react-app-polyfill/ie11';
import 'core-js';

/** @jsx jsx */
import { jsx, Global } from '@emotion/core'

import React from 'react'
import ReactDOM from 'react-dom'
import {
  connect,
  Provider
} from 'react-redux'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  ConnectedRouter,
} from 'connected-react-router'
import {
  Alert,
  GlobalStyleSheet,
  COLORS,
  UniversalHeader
} from '@umich-lib/core'
import {
  initializePride,
  isSlugADatastore,
  URLSearchQueryWrapper,
  getStateFromURL,
} from './modules/pride'
import {
  NoMatch,
  DatastorePage,
  AccessibilityPage,
  TechnicalOverview
} from './modules/pages'
import {
  HelpContent,
} from './modules/search'
import store from './store'
import history from './history'
import {
  Main
} from './modules/core'
import {
  ScrollToTop
} from './modules/core'
import {
  GAListener,
  handleGAClick
} from './modules/analytics'
import ReactGA from 'react-ga'

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
const mapStateToProps = state => {
	return { location: state.router.location };
};
const ConnectedSwitch = connect(mapStateToProps)(Switch);

class App extends React.Component {
  constructor(props) {
    super(props)
    ReactGA.initialize('UA-1341620-18');
  }

  render() {
    return (
      <Provider store={store}>
        <div onClick={handleGAClick} css={{
          background: COLORS.blue['100'],
          minHeight: '100%',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto auto',
          gridTemplateColumns: '100%'
        }}>
          <UniversalHeader />
          <GlobalStyleSheet />
          <Global styles={{
            'html, body, #root': {
              height: '100%'
            }
          }} />
          <ConnectedRouter history={history}>
            <GAListener>
              <ScrollToTop>
                <Main>
                  <ConnectedSwitch>
                    <Route path="/technical-overview" exact component={TechnicalOverview}/>
                    <Route path="/how-to-use-search" exact component={HelpContent}/>
                    <Route path="/accessibility" exact component={AccessibilityPage}/>
                    <Route path="/" exact render={() => (
                      <Redirect to={`/everything`} />
                    )}/>
                    <Route path={`/:datastoreSlug`} render={(props) => {
                      const isDatastore = isSlugADatastore(props.match.params.datastoreSlug)
                      const urlState = getStateFromURL({
                        location: props.location
                      })

                      return (
                        isDatastore && urlState ? (
                          <URLSearchQueryWrapper>
                            <DatastorePage {...props} />
                          </URLSearchQueryWrapper>
                        ) : (
                          <NoMatch />
                        )
                      )
                    }}/>
                    <Route component={NoMatch} />
                  </ConnectedSwitch>
                </Main>
              </ScrollToTop>
            </GAListener>
          </ConnectedRouter>
        </div>
      </Provider>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

const renderPrideFailedToLoad = () => {
  ReactDOM.render(
    <Alert intent="error">
      U-M Library Search is not available. We will fix this issue as soon as we can.
    </Alert>,
    document.getElementById('root')
  )
}

initializePride()

export {
  renderApp,
  renderPrideFailedToLoad
}
