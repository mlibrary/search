import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Record from '../Record';
import KeywordSwitch from '../KeywordSwitch';
import { Anchor } from '../../../reusable';
import Sorts from '../Sorts';
import RecordPlaceholder from '../RecordPlaceholder';
import { SearchResultsMessage } from '../../../search';
import { ResultsSummary } from '../../../records';
import { Specialists } from '../../../specialists';
import { GoToList } from '../../../lists';
import { findWhere } from '../../../reusable/underscore';

function RecordListContainer () {
  const location = useLocation();
  const searchQuery = location.search;

  const activeDatastore = useSelector((state) => {
    return state.datastores.active;
  });
  const activeRecords = useSelector((state) => {
    return state.records.records[activeDatastore] || [];
  });
  const activeFilters = useSelector((state) => {
    return state.filters.active[activeDatastore];
  });
  const datastore = useSelector((state) => {
    return findWhere(state.datastores.datastores, { uid: activeDatastore });
  });
  const loadingRecords = useSelector((state) => {
    return state.records.loading[activeDatastore];
  });
  const list = useSelector((state) => {
    return state.lists[activeDatastore];
  });
  const institution = useSelector((state) => {
    return state.institution;
  });
  const search = useSelector((state) => {
    return state.search;
  });

  const pageNumber = search.page[activeDatastore] || 1;

  if (search.data[activeDatastore] && search.data[activeDatastore].totalAvailable === 0) {
    return (
      <div id='search-results'>
        <div className='results-summary-container'>
          <h2 className='results-summary' aria-live='polite'><span className='strong'>No results</span> match your search: <span style={{ fontWeight: 600 }}>{search.query}</span></h2>
        </div>

        <KeywordSwitch datastore={datastore} query={search.query} />

        <div className='no-results-suggestions'>
          <h2 className='heading-small' style={{ marginTop: '0' }}>Other suggestions</h2>
          <ul style={{ marginBottom: 0 }}>
            <li>Try looking at the other search categories linked below the search box.</li>
            <li>Check your spelling.</li>
            <li>Try more general keywords.</li>
            <li>Try different keywords that mean the same thing.</li>
            <li>Try using <Anchor to={`${datastore.slug}/advanced`}>Advanced Search</Anchor> to construct a targeted query.</li>
            <li>Use <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</Anchor> and we will help you find what you're looking for.</li>
          </ul>
        </div>
      </div>
    );
  }

  const props = {
    activeFilters,
    activeDatastore,
    institution,
    search
  };

  if (loadingRecords) {
    return (
      <div id='search-results'>
        <div className='results-summary-container'>
          <h2 className='results-summary' aria-live='polite'>Loading results for: <span style={{ fontWeight: '600' }}>{search.query}</span></h2>
          <Sorts {...props} />
        </div>
        <GoToList list={list} datastore={datastore} />
        <section className='results-list results-list-border'>
          {[...Array(10)].map((elementInArray, index) => {
            return <RecordPlaceholder key={'placeholder-' + index} />;
          })}
        </section>
      </div>
    );
  }

  if (!activeRecords) {
    return null;
  }

  const showRecord = (record) => {
    return (
      <Record
        record={record}
        datastoreUid={activeDatastore}
        type='medium'
        searchQuery={searchQuery}
        institution={institution}
        list={list}
      />
    );
  };

  return (
    <>
      <div className='results-summary-container'>
        <ResultsSummary />
        <Sorts {...props} />
        <SearchResultsMessage />
      </div>
      <GoToList list={list} datastore={datastore} />
      <div className='results-list results-list-border search-results' id='search-results'>
        {(pageNumber === 1)
          ? (
            <>
              {activeRecords.map((record, index) => {
                const resultsPosition = activeRecords.length < 3 ? activeRecords.length - 1 : 2;
                if (index === resultsPosition) {
                  return (
                    <React.Fragment key={record.uid + '-keyword-switch'}>
                      <KeywordSwitch datastore={datastore} query={search.query} />
                      {showRecord(record)}
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={record.uid + '-specialists'}>
                    {index === 3 && <Specialists />}
                    {showRecord(record)}
                  </React.Fragment>
                );
              })}
            </>
            )
          : (
            <>
              {activeRecords.map((record) => {
                return (
                  <React.Fragment key={record.uid}>
                    {showRecord(record)}
                  </React.Fragment>
                );
              })}
            </>
            )}
      </div>
    </>
  );
}

export default RecordListContainer;
