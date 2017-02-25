import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import { getMultiSearchRecords } from '../../../../pride-interface';
import RecordPreview from '../RecordPreview';

class BentoboxList extends React.Component {
  render() {
    const { allRecords, activeDatastore } = this.props;
    const bentoboxListRecords = getMultiSearchRecords(activeDatastore, allRecords);

    return (
      <ul className="bentobox-list">
        {bentoboxListRecords.map(bentobox => {

          if (!bentobox.records) {
            return null
          }

          return (
            <li key={bentobox.uid} className="bentobox">
              <h2 className="bentobox-heading">{bentobox.name}</h2>
              <ul className="results-list results-list-border">
                {bentobox.records.map((record, index) => {
                  return (
                    <RecordPreview key={index} activeDatastore={bentobox.uid} record={record} />
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    allRecords: state.records.records,
    activeDatastore: state.datastores.active
  };
}

export default connect(mapStateToProps)(BentoboxList);
