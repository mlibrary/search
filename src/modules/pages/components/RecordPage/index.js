import React from 'react';

import { SearchBox } from '../../../search'
import { DatastoreNavigation } from '../../../datastores'
import { RecordFull } from '../../../records'
import { Main } from '../../../core'

class RecordPage extends React.Component {
  render() {
    return (
      <Main>
        <SearchBox />
        <DatastoreNavigation />
        <RecordFull params={this.props.params} />
      </Main>
    )
  }
}


export default RecordPage;
