import React from 'react';

import { RecordFull } from '../../../records';
import { SearchBox } from '../../../search';

class RecordPage extends React.Component {
  render() {
    return (
      <div>
        <SearchBox />
        <RecordFull params={this.props.params} />
      </div>
    )
  }
}


export default RecordPage;
