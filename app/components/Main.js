import React from 'react'

import { Header } from './Header.js'
import { SearchBox } from './SearchBox.js'
import { DatastoreList } from './Datastores.js'
import { Records } from './Records.js'

import { prideSwitchToDatastore, prideRunSearch } from './../pride_interface.js'

require("../assets/stylesheets/main.scss")


class Main extends React.Component {
  render() {
    return (
      <main>
        <Header/>
        <SearchBox
          onSubmitSearch={text =>
            prideRunSearch(text)
          }
        />
        <DatastoreList
          datastores={this.props.datastores}
          activeDatastore={this.props.active_datastore}
          onDatastoreClick={uid =>
            prideSwitchToDatastore(uid)
          }
        />
        <div className="container container-narrow">
          <Records
            records={this.props.records}
          />
        </div>
      </main>
    )
  }
}

export default Main
