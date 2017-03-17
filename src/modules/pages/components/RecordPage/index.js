import React from 'react';

import { RecordFull } from '../../../records';
import { SearchBox } from '../../../search';

class RecordPage extends React.Component {
  render() {
    return (
      <div>
        <RecordFull params={this.props.params} />
      </div>
    )
  }
}


export default RecordPage;
