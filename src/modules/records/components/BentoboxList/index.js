import './styles.css';
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

const descriptions = {
  databases: 'Online resources of all types — text, images, audio, video, data, etc. — some open access, many restricted to U-M.',
  mirlyn: 'Everything in our physical collection as well as ebooks, audio, video, and online journals.',
  onlinejournals: 'Scholarly journals, newspapers, trade and popular magazines, annual publications, and more.',
  primo: 'Articles from scholarly journals, magazines, and newspapers; ebooks and chapters; proceedings; reports; and more — all online.',
  website: 'U-M Library created research guides, specialty sites, blogs, and online exhibits.'
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
    <article className='bentobox-list'>
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
              <Anchor className='flex padding-x__m padding-y__xs bentobox-heading' to={`/${slug}${searchQuery}`}>
                <h2 className='h4 margin__none'>{name}</h2>
                <small>
                  {typeof totalResults === 'number'
                    ? `${totalResults.toLocaleString()} Result${totalResults === 1 ? '' : 's'}`
                    : 'Loading...'}
                </small>
              </Anchor>
              {descriptions[uid] && (
                <div className='record-preview bentobox-description'>
                  <span>{descriptions[uid]}</span>
                </div>
              )}
              {hasRecords && <KeywordSwitch {...{ datastore, query }} />}
              {totalResults === 0
                ? (
                    <div className='record-preview bentobox-no-results'>
                      <p>
                        <span className='strong'>No results</span> match your search.
                      </p>
                      {['databases', 'onlinejournals'].includes(uid) && (
                        <p>
                          Try our <Anchor to={`/${slug}/browse`}>Browse {name} page</Anchor> to view all titles alphabetically or by academic discipline.
                        </p>
                      )}
                      {uid === 'mirlyn' && (
                        <p>
                          <ILLRequestMessage />
                        </p>
                      )}
                    </div>
                  )
                : (
                    <>
                      <div className='results-list'>
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
                        <Anchor className='flex padding-x__m padding-y__s underline__hover bentobox-footer' to={`/${slug}${searchQuery}`}>
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
