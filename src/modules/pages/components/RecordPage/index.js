import React from 'react';

import { SearchBox } from '../../../search'
import { DatastoreNavigation } from '../../../datastores'
import { RecordFull } from '../../../records'

class RecordPage extends React.Component {
  render() {
    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <RecordFull params={this.props.params} />
      </div>
    )
  }
}


export default RecordPage;
