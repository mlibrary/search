import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
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

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <URLSearchQueryWrapper>
        <Switch>
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
        </Switch>
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
