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
  URLSearchQueryWrapper
} from './modules/pride'
import {
  NoMatch,
  DatastorePage,
  RecordPage
} from './modules/pages'
import store from './store'
import history from './history'

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
      <URLSearchQueryWrapper>
        <ConnectedSwitch>
          <Route path="/" exact render={() => (
            <Redirect to={`/everything`} />
          )}/>
          <Route path={`/:datastoreSlug`} exact render={(props) => {
            const isDatastore = isSlugADatastore(props.match.params.datastoreSlug)

            console.log('datastoreSlug', props.match.params.datastoreSlug)

            return (
              isDatastore ? (
                <DatastorePage {...props} />
              ) : (
                <NoMatch />
              )
            )
          }}/>
          <Route path={`/:datastoreSlug/record/:recordUid`} exact render={(props) => {
            const isDatastore = isSlugADatastore(props.match.params.datastoreSlug)
            return (
              isDatastore ? (
                <RecordPage {...props} />
              ) : (
                <NoMatch />
              )
            )
          }}/>
          <Route component={NoMatch} />
        </ConnectedSwitch>
      </URLSearchQueryWrapper>
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
