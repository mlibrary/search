import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import RecordMedium from '../RecordMedium';
import RecordPlaceholder from '../RecordPlaceholder';
import { ClearSearchButton } from '../../../search';

import {
  ResultsSummary,
} from '../../../records';

class RecordListContainer extends React.Component {
  render() {
    const { activeRecords, activeDatastore, loadingRecords } = this.props;

    if (loadingRecords) {
      return (
        <div>
          <div className="results-summary-container">
            <ClearSearchButton />
            <ResultsSummary />
          </div>
          <ul className="results-list results-list-border">
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
            <RecordPlaceholder />
          </ul>
        </div>
      )
    }

    if (!activeRecords) {
      return null;
    }

    return (
      <div>
        <div className="results-summary-container">
          <ClearSearchButton />
          <ResultsSummary />
        </div>
        <ul className="results-list results-list-border">
          {activeRecords.map((record, index) =>
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
    activeRecords: _.values(state.records.records[state.datastores.active]),
    loadingRecords: state.records.loading,
    activeDatastore: state.datastores.active,
  };
}

export default connect(mapStateToProps)(RecordListContainer);
