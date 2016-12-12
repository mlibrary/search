import React from 'react'

import SearchBox from '.././SearchBox'
import DatastoreNavigation from './DatastoreNavigation'
import Records from './../records/RecordList'

class DatastorePage extends React.Component {
  render() {
    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <div className="container container-narrow">
        <Records />
        </div>
      </div>
    )
  }
}

export default DatastorePage
