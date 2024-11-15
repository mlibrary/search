import { Anchor, Icon } from '../../../reusable';
import { getMultiSearchRecords } from '../../../pride';
import ILLRequestMessage from '../ILLRequestMessage';
import KeywordSwitch from '../KeywordSwitch';
import PropTypes from 'prop-types';
import React from 'react';
import RecordPreview from '../RecordPreview';
import RecordPreviewPlaceholder from '../RecordPreviewPlaceholder';
import { Specialists } from '../../../specialists';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BentoResults = ({ bentobox, search, searchQuery }) => {
  // No results
  if (search.data[bentobox.uid]?.totalAvailable === 0) {
    return (
      <>
        {bentobox.uid === 'primo' && <KeywordSwitch datastore={bentobox} query={search.query} />}
        <div className='bentobox-no-results'>
          <p className='no-margin'><span className='strong'>No results</span> match your search.</p>
          {['databases', 'onlinejournals'].includes(bentobox.uid) && (
            <p className='u-margin-bottom-none'>Try our <Anchor to={`/${bentobox.slug}/browse`}>Browse {bentobox.name} page</Anchor> to view all titles alphabetically or by academic discipline.</p>
          )}
          {bentobox.uid === 'mirlyn' && (
            <p className='u-margin-bottom-none'><ILLRequestMessage /></p>
          )}
        </div>
      </>
    );
  }

  // Loading results
  if (bentobox.records.length === 0) {
    return (
      <div className='results-list results-list-border'>
        {[...Array(3)].map((elementInArray, index) => {
          return <RecordPreviewPlaceholder key={index} />;
        })}
      </div>
    );
  }

  // Results
  return (
    <div className='results-list results-list-border'>
      {bentobox.records.map((record, index) => {
        if (index === 0) {
          return (
            <div key={`${index}keyword-switch`}>
              <KeywordSwitch datastore={bentobox} query={search.query} />
              <RecordPreview
                key={index}
                datastoreUid={bentobox.uid}
                record={record}
                searchQuery={searchQuery}
              />
            </div>
          );
        }
        return (
          <RecordPreview
            key={index}
            datastoreUid={bentobox.uid}
            record={record}
            searchQuery={searchQuery}
          />
        );
      })}
    </div>
  );
};

BentoResults.propTypes = {
  bentobox: PropTypes.object,
  search: PropTypes.object,
  searchQuery: PropTypes.string
};

const BentoboxList = () => {
  const { records } = useSelector((state) => {
    return state.records;
  });
  const { active: datastoreUid } = useSelector((state) => {
    return state.datastores;
  });
  const search = useSelector((state) => {
    return state.search;
  });
  const location = useLocation();
  const searchQuery = location.search;

  return (
    <article className='bentobox-list' id='search-results'>
      {getMultiSearchRecords(datastoreUid, records).map((bentobox, index) => {
        if (!bentobox.records) {
          return null;
        }

        const totalResults = search.data[bentobox.uid]?.totalAvailable;

        return (
          <React.Fragment key={bentobox.uid}>
            {index === 2 && <Specialists show={2} />}
            <section className={`bentobox bentobox-${bentobox.uid}`}>
              <div className='container__rounded'>
                <Anchor
                  className='bentobox-heading-container'
                  to={`/${bentobox.slug}${searchQuery}`}
                >
                  <h2 className='bentobox-heading'>{bentobox.name}</h2>
                  <span className='bentobox-results-info'>{typeof totalResults === 'number' ? `${totalResults.toLocaleString()} Result${totalResults === 1 ? '' : 's'}` : 'Loading...'}</span>
                </Anchor>
                <BentoResults {...{ bentobox, datastoreUid, search, searchQuery }} />
                {(totalResults > 0 || bentobox.records.length > 0) && (
                  <Anchor
                    className='bentobox-footer-container'
                    to={`/${bentobox.slug}${searchQuery}`}
                  >
                    <span>{`View all ${bentobox.name} results`}</span><Icon icon='arrow_forward' size='1.5rem' />
                  </Anchor>
                )}
              </div>
            </section>
          </React.Fragment>
        );
      })}
    </article>
  );
};

export default BentoboxList;
