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
} from 'react-router-redux'
import {
  initializePride,
  isSlugADatastore,
  URLSearchQueryWrapper,
  getStateFromURL,
} from './modules/pride'
import {
  NoMatch,
  DatastorePage,
  RoadMapPage
} from './modules/pages'
import {
  HelpContent,
} from './modules/search'
import store from './store'
import history from './history'
import {
  Main
} from './modules/core'

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

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Main>
        <ConnectedSwitch>
          <Route path="/how-to-use-search" component={HelpContent}/>
          <Route path="/feature-road-map" component={RoadMapPage}/>
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
    </ConnectedRouter>
  </Provider>
)

const renderApp = () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  )
}

initializePride()

export {
  renderApp
}
