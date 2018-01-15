import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import { withRouter } from 'react-router-dom'
import Record from '../Record';
import Sorts from '../Sorts';
import RecordPlaceholder from '../RecordPlaceholder';

import {
  ResultsSummary,
} from '../../../records';

import {
  AtoZ,
} from '../../../browse';

class RecordListContainer extends React.Component {
  render() {
    const {
      activeRecords,
      datastoreUid,
      loadingRecords,
      search,
      searchQuery,
      institution
    } = this.props;

    if (search.data[datastoreUid] && search.data[datastoreUid].totalAvailable === 0) {
      return (
        <div>
          <div className="results-summary-container">
            <div aria-live="polite">
              <p className="no-margin"><b>No results</b> match your search.</p>
            </div>
          </div>

          <div className="no-results-suggestions">
            <h2>Other Search Suggestions</h2>
            <ul>
              <li>Try using the other options in the search navigation.</li>
              <li>Check your spelling.</li>
              <li>Try more general keywords.</li>
              <li>Try different keywords that mean the same thing.</li>
              <li>Use Ask a Librarian and we will help you find what you're looking for.</li>
            </ul>
          </div>
        </div>
      )
    }

    if (loadingRecords) {
      return (
        <div>
          <div className="results-summary-container">
            <div aria-live="polite">
              <p className="no-margin">Loading results...</p>
            </div>
            <Sorts />
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
          <span aria-live="polite"><ResultsSummary /></span>
          <Sorts />
        </div>
        <AtoZ />
        <ul className="results-list results-list-border">
          {activeRecords.map((record, index) =>
            <Record
              record={record}
              datastoreUid={datastoreUid}
              key={index}
              type='medium'
              searchQuery={searchQuery}
              institution={institution}
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
    loadingRecords: state.records.loading[state.datastores.active],
    datastoreUid: state.datastores.active,
    search: state.search,
    searchQuery: state.router.location.search,
    institution: state.institution
  };
}

export default withRouter(connect(mapStateToProps)(RecordListContainer));
