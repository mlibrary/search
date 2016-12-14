import React from 'react'

import SearchBox from '.././SearchBox'
import DatastoreNavigation from './DatastoreNavigation'
import Records from './../records/RecordList'
import FacetList from './../facets/FacetList'

class DatastorePage extends React.Component {
  render() {
    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <div className="container container-narrow">
          <div className="flex-container">
            <div className="side-container margin-right-2">
              <FacetList />
            </div>
            <div className="content-container">
              <Records />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DatastorePage
