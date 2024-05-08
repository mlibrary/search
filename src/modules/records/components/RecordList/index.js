import React from 'react';
import { useSelector } from 'react-redux';
import Record from '../Record';
import KeywordSwitch from '../KeywordSwitch';
import { Anchor } from '../../../reusable';
import Sorts from '../Sorts';
import { SearchResultsMessage } from '../../../search';
import { Specialists } from '../../../specialists';
import { GoToList } from '../../../lists';

function RecordList () {
  const { active: activeDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const { loading, records } = useSelector((state) => {
    return state.records;
  });
  const list = useSelector((state) => {
    return state.lists[activeDatastore];
  });
  const { data, query } = useSelector((state) => {
    return state.search;
  });

  const { count, page, totalAvailable = 0, totalPages } = data[activeDatastore];
  const noResults = totalAvailable === 0;
  const endRange = totalAvailable <= count || page === totalPages
    ? totalAvailable
    : (Math.min(page * count, totalAvailable));
  const datastore = datastores.find((ds) => {
    return ds.uid === activeDatastore;
  });
  const loadingRecords = loading[activeDatastore];
  const activeRecords = records[activeDatastore] || [];

  const message = () => {
    if (!noResults) {
      return <>{(page * count - (count - 1)).toLocaleString()} to {endRange.toLocaleString()} of {totalAvailable.toLocaleString()} {datastore.name} result{totalAvailable !== 1 && 's'}</>;
    }

    return <>{loadingRecords ? 'Loading results for: ' : (<><span className='strong'>No results</span> match your search: </>)} <span className='strong'>{query}</span></>;
  };

  return (
    <>
      <div className='results-summary-container flex__responsive container__rounded'>
        <h2 className='results-summary' aria-live='polite'>
          {message()}
        </h2>
        {!noResults && <Sorts {...{ activeDatastore }} />}
        {!loadingRecords && <SearchResultsMessage />}
      </div>
      {noResults && !loadingRecords
        ? (
          <>
            <KeywordSwitch {...{ datastore, query }} />
            <div className='no-results-suggestions'>
              <h2 className='heading-small margin-top__none'>Other suggestions</h2>
              <ul className='margin-bottom__none'>
                <li>Try looking at the other search categories linked below the search box.</li>
                <li>Check your spelling.</li>
                <li>Try more general keywords.</li>
                <li>Try different keywords that mean the same thing.</li>
                <li>Try using <Anchor to={`${datastore.slug}/advanced`}>Advanced Search</Anchor> to construct a targeted query.</li>
                <li>Use <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</Anchor> and we will help you find what you&apos;re looking for.</li>
              </ul>
            </div>
          </>
          )
        : (
          <>
            <GoToList {...{ datastore, list }} />
            <div className='results-list results-list-border search-results'>
              {loadingRecords
                ? [...Array(count)].map((elementInArray, index) => {
                    return (
                      <div className='container__rounded record' key={'placeholder-' + index}>
                        <div className='record-container placeholder-container margin-top__m'>
                          <div className='placeholder placeholder-title' />
                          <div className='placeholder placeholder-line' />
                          <div className='placeholder placeholder-line placeholder-line-alt' />
                          <div className='placeholder placeholder-line' />
                        </div>
                        <div className='resource-access-container'>
                          <div className='access-placeholder-container'>
                            <div className='placeholder placeholder-access placeholder-inline' />
                            <div className='placeholder placeholder-inline' />
                          </div>
                        </div>
                      </div>
                    );
                  })
                : activeRecords.map((record, index) => {
                  return (
                    <React.Fragment key={record.uid}>
                      {(page === 1 && index === Math.min(activeRecords.length - 1, 2)) && <KeywordSwitch {...{ datastore, query }} />}
                      {(page === 1 && index === 3) && <Specialists />}
                      <Record
                        {...{
                          record,
                          datastoreUid: activeDatastore,
                          list
                        }}
                      />
                    </React.Fragment>
                  );
                })}
            </div>
          </>
          )}
    </>
  );
}

export default RecordList;
