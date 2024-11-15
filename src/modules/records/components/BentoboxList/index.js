import { Anchor, Icon } from '../../../reusable';
import { getMultiSearchRecords } from '../../utilities';
import ILLRequestMessage from '../ILLRequestMessage';
import KeywordSwitch from '../KeywordSwitch';
import React from 'react';
import RecordPreview from '../RecordPreview';
import RecordPreviewPlaceholder from '../RecordPreviewPlaceholder';
import { Specialists } from '../../../specialists';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
        const { name, records: datastoreRecords, slug, uid } = datastore;

        if (!datastoreRecords) {
          return null;
        }

        const totalResults = data[uid]?.totalAvailable;
        const hasRecords = datastoreRecords.length > 0;

        return (
          <React.Fragment key={uid}>
            {index === 2 && <Specialists show={2} />}
            <section className={`container__rounded bentobox bentobox-${uid}`}>
              <Anchor className='bentobox-heading-container' to={`/${slug}${searchQuery}`}>
                <h2 className='bentobox-heading'>{name}</h2>
                <span className='bentobox-results-info'>
                  {typeof totalResults === 'number'
                    ? `${totalResults.toLocaleString()} Result${totalResults === 1 ? '' : 's'}`
                    : 'Loading...'}
                </span>
              </Anchor>
              {hasRecords && <KeywordSwitch {...{ datastore, query }} />}
              {totalResults === 0
                ? (
                    <div className='bentobox-no-results'>
                      <p className='no-margin'>
                        <span className='strong'>No results</span> match your search.
                      </p>
                      {['databases', 'onlinejournals'].includes(uid) && (
                        <p className='u-margin-bottom-none'>
                          Try our <Anchor to={`/${slug}/browse`}>Browse {name} page</Anchor> to view all titles alphabetically or by academic discipline.
                        </p>
                      )}
                      {uid === 'mirlyn' && (
                        <p className='u-margin-bottom-none'>
                          <ILLRequestMessage />
                        </p>
                      )}
                    </div>
                  )
                : (
                    <>
                      <div className='results-list results-list-border'>
                        {hasRecords
                          ? datastoreRecords.map((record, place) => {
                            return (
                              <RecordPreview key={`${uid}-${place}`} {...{ datastoreUid: uid, record, searchQuery }} />
                            );
                          })
                          : Array.from({ length: 3 }).map((elementInArray, place) => {
                            return <RecordPreviewPlaceholder key={place} />;
                          })}
                      </div>
                      {hasRecords && (
                        <Anchor className='bentobox-footer-container' to={`/${slug}${searchQuery}`}>
                          <span>{`View all ${name} results`}</span>
                          <Icon icon='arrow_forward' size='1.5rem' />
                        </Anchor>
                      )}
                    </>
                  )}
            </section>
          </React.Fragment>
        );
      })}
    </article>
  );
};

export default BentoboxList;
