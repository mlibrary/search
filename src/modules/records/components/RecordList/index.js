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
  SpecialistsWrapper
} from '../../../specialists'
import {
  GoToList
} from '../../../lists'

class RecordListContainer extends React.Component {
  render() {
    const {
      activeRecords,
      datastoreUid,
      loadingRecords,
      search,
      searchQuery,
      institution,
      list,
      datastore
    } = this.props;

    const pageNumber = search.page[datastoreUid] || 1

    if (search.data[datastoreUid] && search.data[datastoreUid].totalAvailable === 0) {
      return (
        <div id="search-results">
          <div className="results-summary-container">
            <h2 className="results-summary"><b>No results</b> match your search.</h2>
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
        <div id="search-results">
          <div className="results-summary-container">
            <h2 className="results-summary">Loading results...</h2>
            <Sorts />
          </div>
          <GoToList list={list} datastore={datastore} />
          <section className="results-list results-list-border">
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
          </section>
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
          <Sorts />
        </div>
        <GoToList list={list} datastore={datastore} />
        <div className="results-list results-list-border search-results" id="search-results">
          {(pageNumber === 1) ? (
            <SpecialistsWrapper position={3}>
              {activeRecords.map((record, index) =>
                <Record
                  record={record}
                  datastoreUid={datastoreUid}
                  key={index}
                  type='medium'
                  searchQuery={searchQuery}
                  institution={institution}
                  list={list}/>
              )}
            </SpecialistsWrapper>
          ) : (
            <React.Fragment>
              {activeRecords.map((record, index) =>
                <Record
                  record={record}
                  datastoreUid={datastoreUid}
                  key={index}
                  type='medium'
                  searchQuery={searchQuery}
                  institution={institution}
                  list={list}/>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeRecords: _.values(state.records.records[state.datastores.active]),
    loadingRecords: state.records.loading[state.datastores.active],
    datastoreUid: state.datastores.active,
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    search: state.search,
    searchQuery: state.router.location.search,
    institution: state.institution,
    list: state.lists[state.datastores.active],
  };
}

export default withRouter(connect(mapStateToProps)(RecordListContainer));
