import React from 'react'

import SearchBox from '.././SearchBox'
import DatastoreNavigation from './DatastoreNavigation'

class DatastorePage extends React.Component {
  render() {
    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <div className="container container-narrow">
          <p>Datastore</p>
        </div>
      </div>
    )
  }
}

export default DatastorePage
