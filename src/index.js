import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {
  ConnectedRouter,
} from 'react-router-redux'
import {
  initializePride,
  isSlugADatastore
} from './modules/pride'
import {
  NoMatch,
  IndexPage,
  DatastorePage,
  AdvancedPage,
} from './modules/pages'
import store from './store'
import history from './history'

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact render={() => (
          <Redirect to={`/everything`} />
        )}/>
        <Route path={`/:datastoreSlug`} exact render={(props) => {
          const isDatastore = isSlugADatastore(props.match.params.datastoreSlug)
          return (
            isDatastore ? (
              <DatastorePage {...props} />
            ) : (
              <NoMatch />
            )
          )
        }}/>
        <Route component={NoMatch} />
      </Switch>
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
