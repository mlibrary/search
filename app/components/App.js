import React from 'react'

import { SearchBox } from './SearchBox.js'
import { DatastoreList } from './Datastores.js'
import { store } from '../store/index.js'

import { changeActiveDatastore } from '../store/actions.js'

require("../assets/stylesheets/main.scss")

export class App extends React.Component {
  render() {
    const {
      datastores,
      active_datastore
    } = this.props.state
    return (
      <main>
        <SearchBox/>
        <DatastoreList
          datastores={datastores}
          activeDatastore={active_datastore}
          onDatastoreClick={uid =>
            store.dispatch(changeActiveDatastore(uid))
          }
        />
      </main>
    )
  }
}
