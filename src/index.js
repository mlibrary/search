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
  getStateFromURL
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
      <ConnectedSwitch>
        <Route path="/" exact render={() => (
          <Redirect to={`/everything`} />
        )}/>
        <Route path={`/:datastoreSlug`} exact render={(props) => {
          const isDatastore = isSlugADatastore(props.match.params.datastoreSlug)
          // getStateFromURL() will return undefined if search query from the url
          // is an invalid shape. TODO: redirect to page that is more specific.
          // 'your search query in the url is not correct... here are some
          // suggestions to improve it ...'
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
