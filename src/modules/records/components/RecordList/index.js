import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import Record from '../Record';
import RecordPlaceholder from '../RecordPlaceholder';
import { ClearSearchButton } from '../../../search';

import {
  ResultsSummary,
} from '../../../records';

class RecordListContainer extends React.Component {
  render() {
    const { activeRecords, datastoreUid, loadingRecords, search } = this.props;

    if (search.data[datastoreUid] && search.data[datastoreUid].totalAvailable === 0) {
      return (
        <div>
          <div className="results-summary-container">
            <div>
              <p className="no-margin"><b>No results</b> found for your search.</p>
            </div>
            <ClearSearchButton />
          </div>
        </div>
      )
    }

    if (loadingRecords) {
      return (
        <div>
          <div className="results-summary-container">
            <div>
              <p className="no-margin">Loading results...</p>
            </div>
            <ClearSearchButton />
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
          <ResultsSummary />
          <ClearSearchButton />
        </div>
        <ul className="results-list results-list-border">
          {activeRecords.map((record, index) =>
            <Record
              record={record}
              datastoreUid={datastoreUid}
              key={index}
              type='medium'
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
    datastoreUid: state.datastores.active,
    search: state.search,
  };
}

export default connect(mapStateToProps)(RecordListContainer);
