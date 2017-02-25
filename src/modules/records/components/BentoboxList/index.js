import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import { getMultiSearchRecords } from '../../../../pride-interface';

class BentoboxList extends React.Component {
  render() {
    const { allRecords, activeDatastore } = this.props;
    const bentoboxListRecords = getMultiSearchRecords(activeDatastore, allRecords);

    console.log('bentoboxListRecords', bentoboxListRecords)

    return (
      <div>
        {bentoboxListRecords.map(list => {
          return (
            <p key={list.uid}>{list.name}</p>
          )
        })}
      </div>
    )

    return <p>BentoBoxes {this.props.activeDatastore}</p>
  }
}

function mapStateToProps(state) {
  return {
    allRecords: state.records.records,
    activeDatastore: state.datastores.active
  };
}

export default connect(mapStateToProps)(BentoboxList);
