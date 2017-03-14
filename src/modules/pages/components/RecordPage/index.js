import React from 'react';

import { RecordFull } from '../../../records';
import { SearchBox } from '../../../search';
import {
  DatastoreNavigation,
} from '../../../datastores';

class RecordPage extends React.Component {
  render() {
    return (
      <div>
        <SearchBox />
        <DatastoreNavigation />
        <div className="container container-narrow">
          <RecordFull />
        </div>
      </div>
    )
  }
}


export default RecordPage;
