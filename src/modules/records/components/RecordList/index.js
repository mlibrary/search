import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { withRouter } from 'react-router-dom';
import Record from '../Record';
import KeywordSwitch from '../KeywordSwitch';
import Sorts from '../Sorts';
import RecordPlaceholder from '../RecordPlaceholder';
import { SearchResultsMessage } from '../../../search';
import { ResultsSummary } from '../../../records';
import { SpecialistsWrapper } from '../../../specialists';
import { GoToList } from '../../../lists';
import PropTypes from 'prop-types';

class RecordListContainer extends React.Component {
  render () {
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

    const pageNumber = search.page[datastoreUid] || 1;

    if (search.data[datastoreUid] && search.data[datastoreUid].totalAvailable === 0) {
      return (
        <div id='search-results'>
          <div className='results-summary-container'>
            <h2 className='results-summary' aria-live='polite'><b>No results</b> match your search: <span style={{ fontWeight: 600 }}>{search.query}</span></h2>
          </div>

          <KeywordSwitch datastore={datastore} query={search.query} />

          <div className='no-results-suggestions'>
            <h2 className='heading-small' style={{ marginTop: '0' }}>Other suggestions</h2>
            <ul style={{ marginBottom: 0 }}>
              <li>Try looking at the other search categories linked below the search box.</li>
              <li>Check your spelling.</li>
              <li>Try more general keywords.</li>
              <li>Try different keywords that mean the same thing.</li>
              <li>Try using <a href={`${datastore.slug}/advanced`} className='underline'>Advanced Search</a> to construct a targeted query.</li>
              <li>Use <a href='https://www.lib.umich.edu/ask-librarian' className='underline'>Ask a Librarian</a> and we will help you find what you're looking for.</li>
            </ul>
          </div>
        </div>
      );
    }

    if (loadingRecords) {
      return (
        <div id='search-results'>
          <div className='results-summary-container'>
            <h2 className='results-summary' aria-live='polite'>Loading results for: <span style={{ fontWeight: '600' }}>{search.query}</span></h2>
            <Sorts />
          </div>
          <GoToList list={list} datastore={datastore} />
          <section className='results-list results-list-border'>
            {[...Array(10)].map((elementInArray, index) => {
              return <RecordPlaceholder key={index} />;
            })}
          </section>
        </div>
      );
    }

    if (!activeRecords) {
      return null;
    }

    return (
      <div>
        <div className='results-summary-container'>
          <ResultsSummary />
          <Sorts />
          <SearchResultsMessage />
        </div>
        <GoToList list={list} datastore={datastore} />
        <div className='results-list results-list-border search-results' id='search-results'>
          {(pageNumber === 1)
            ? (
              <SpecialistsWrapper position={3}>
                {activeRecords.map((record, index) => {
                  const resultsPosition = activeRecords.length < 3 ? activeRecords.length - 1 : 2;
                  if (index === resultsPosition) {
                    return (
                      <div key={index + 'keyword-switch'}>
                        <KeywordSwitch datastore={datastore} query={search.query} />
                        <Record
                          record={record}
                          datastoreUid={datastoreUid}
                          type='medium'
                          searchQuery={searchQuery}
                          institution={institution}
                          list={list}
                        />
                      </div>
                    );
                  }
                  return (
                    <Record
                      record={record}
                      datastoreUid={datastoreUid}
                      key={index}
                      type='medium'
                      searchQuery={searchQuery}
                      institution={institution}
                      list={list}
                    />
                  );
                })}
              </SpecialistsWrapper>
              )
            : (
              <>
                {activeRecords.map((record, index) => {
                  return (
                    <Record
                      record={record}
                      datastoreUid={datastoreUid}
                      key={index}
                      type='medium'
                      searchQuery={searchQuery}
                      institution={institution}
                      list={list}
                    />
                  );
                }
                )}
              </>
              )}
        </div>
      </div>
    );
  }
}

RecordListContainer.propTypes = {
  activeRecords: PropTypes.array,
  datastoreUid: PropTypes.string,
  loadingRecords: PropTypes.bool,
  search: PropTypes.object,
  searchQuery: PropTypes.string,
  institution: PropTypes.object,
  list: PropTypes.array,
  datastore: PropTypes.object
};

function mapStateToProps (state) {
  return {
    activeRecords: _.values(state.records.records[state.datastores.active]),
    loadingRecords: state.records.loading[state.datastores.active],
    datastoreUid: state.datastores.active,
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    search: state.search,
    searchQuery: state.router.location.search,
    institution: state.institution,
    list: state.lists[state.datastores.active]
  };
}

export default withRouter(connect(mapStateToProps)(RecordListContainer));
