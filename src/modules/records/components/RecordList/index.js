import React from 'react';
import { connect } from 'react-redux';

import RecordMedium from '../RecordMedium';
import { Loading } from '../../../core';

import {
  ResultsSummary,
} from '../../../records';

class RecordListContainer extends React.Component {
  render() {
    const { records, activeDatastore, searching } = this.props;

    if (searching) {
      return <Loading />
    }

    return (
      <div>
        <div className="results-summary-container">
          <ResultsSummary />
        </div>
        <ul className="results-list results-list-border">
          {records.records.map((record, index) =>
            <RecordMedium
              record={record}
              activeDatastore={activeDatastore}
              key={index}
            />,
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    records: state.records,
    loading: state.loading,
    searching: state.search.searching,
    activeDatastore: state.datastores.active,
  };
}

export default connect(mapStateToProps)(RecordListContainer);
