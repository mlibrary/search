import React from 'react'

import { Header } from './Header.js'
import { SearchBox } from './SearchBox.js'
import { DatastoreList } from './Datastores.js'
import { Records } from './Records.js'
import { store } from '../store/index.js'

import { prideSwitchToDatastore, prideRunSearch } from './../store/pride_interface.js'

require("../assets/stylesheets/main.scss")

export class App extends React.Component {
  render() {
    const {
      datastores,
      active_datastore,
      records
    } = this.props.state
    return (
      <main>
        <Header/>
        <SearchBox
          onSubmitSearch={text =>
            prideRunSearch(text)
          }
        />
        <DatastoreList
          datastores={datastores}
          activeDatastore={active_datastore}
          onDatastoreClick={uid =>
            prideSwitchToDatastore(uid)
          }
        />
        <div className="container container-narrow">
          <Records
            records={records}
          />
        </div>
      </main>
    )
  }
}
