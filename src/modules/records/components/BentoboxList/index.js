import { Anchor, Icon } from '../../../reusable';
import { getMultiSearchRecords } from '../../utilities';
import ILLRequestMessage from '../ILLRequestMessage';
import KeywordSwitch from '../KeywordSwitch';
import PropTypes from 'prop-types';
import React from 'react';
import RecordPreview from '../RecordPreview';
import RecordPreviewPlaceholder from '../RecordPreviewPlaceholder';
import { Specialists } from '../../../specialists';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BentoResults = ({ data, datastore, query, searchQuery }) => {
  // No results
  if (data[datastore.uid]?.totalAvailable === 0) {
    return (
      <>
        {datastore.uid === 'primo' && <KeywordSwitch datastore={datastore} query={query} />}
        <div className='bentobox-no-results'>
          <p className='no-margin'><span className='strong'>No results</span> match your search.</p>
          {['databases', 'onlinejournals'].includes(datastore.uid) && (
            <p className='u-margin-bottom-none'>Try our <Anchor to={`/${datastore.slug}/browse`}>Browse {datastore.name} page</Anchor> to view all titles alphabetically or by academic discipline.</p>
          )}
          {datastore.uid === 'mirlyn' && (
            <p className='u-margin-bottom-none'><ILLRequestMessage /></p>
          )}
        </div>
      </>
    );
  }

  // Loading results
  if (datastore.records.length === 0) {
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
      {datastore.records.map((record, index) => {
        if (index === 0) {
          return (
            <div key={`${index}keyword-switch`}>
              <KeywordSwitch {...{ datastore, query }} />
              <RecordPreview
                key={index}
                datastoreUid={datastore.uid}
                record={record}
                searchQuery={searchQuery}
              />
            </div>
          );
        }
        return (
          <RecordPreview
            key={index}
            datastoreUid={datastore.uid}
            record={record}
            searchQuery={searchQuery}
          />
        );
      })}
    </div>
  );
};

BentoResults.propTypes = {
  data: PropTypes.object,
  datastore: PropTypes.object,
  query: PropTypes.string,
  searchQuery: PropTypes.string
};

const BentoboxList = () => {
  const { records } = useSelector((state) => {
    return state.records;
  });
  const { active } = useSelector((state) => {
    return state.datastores;
  });
  const { data, query } = useSelector((state) => {
    return state.search;
  });
  const location = useLocation();
  const searchQuery = location.search;

  return (
    <article className='bentobox-list' id='search-results'>
      {getMultiSearchRecords(active, records).map((datastore, index) => {
        if (!datastore.records) {
          return null;
        }

        const totalResults = data[datastore.uid]?.totalAvailable;

        return (
          <React.Fragment key={datastore.uid}>
            {index === 2 && <Specialists show={2} />}
            <section className={`bentobox bentobox-${datastore.uid}`}>
              <div className='container__rounded'>
                <Anchor
                  className='bentobox-heading-container'
                  to={`/${datastore.slug}${searchQuery}`}
                >
                  <h2 className='bentobox-heading'>{datastore.name}</h2>
                  <span className='bentobox-results-info'>{typeof totalResults === 'number' ? `${totalResults.toLocaleString()} Result${totalResults === 1 ? '' : 's'}` : 'Loading...'}</span>
                </Anchor>
                <BentoResults {...{ active, data, datastore, query, searchQuery }} />
                {(totalResults > 0 || datastore.records.length > 0) && (
                  <Anchor
                    className='bentobox-footer-container'
                    to={`/${datastore.slug}${searchQuery}`}
                  >
                    <span>{`View all ${datastore.name} results`}</span><Icon icon='arrow_forward' size='1.5rem' />
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
