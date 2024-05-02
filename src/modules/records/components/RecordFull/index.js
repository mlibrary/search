import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { findWhere } from '../../../reusable/underscore';
import { Anchor, Breadcrumb, H1 } from '../../../reusable';
import { ResourceAccess } from '../../../resource-acccess';
import { TrimString } from '../../../core';
import { getField, getFieldValue } from '../../utilities';
import {
  ViewMARC,
  RecordFullFormats,
  FullRecordPlaceholder,
  RecommendedResource,
  RecordDescription,
  Zotero,
  RecordMetadata
} from '../../../records';
import { requestRecord } from '../../../pride';
import { setDocumentTitle } from '../../../a11y';
import {
  ActionsList,
  prejudice,
  AddToListButton,
  isInList,
  GoToList
} from '../../../lists';
import { NoMatch } from '../../../pages';
let prejudiceInstance = prejudice.createVariableStorageDriverInstance();

const FullRecord = () => {
  const [activeAction, setActiveAction] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const record = useSelector((state) => {
    return state.records.record;
  });
  const datastores = useSelector((state) => {
    return state.datastores;
  });
  const list = useSelector((state) => {
    return state.lists[datastores.active];
  });

  const recordUid = params.recordUid;
  const datastoreUid = datastores.active;
  const datastore = findWhere(datastores.datastores, {
    uid: datastoreUid
  });

  useEffect(() => {
    requestRecord({ recordUid, datastoreUid });
    prejudiceInstance = prejudice.createVariableStorageDriverInstance();
    prejudiceInstance.clearRecords();
    prejudiceInstance.addRecord({ recordUid, datastoreUid });
  }, [recordUid, datastoreUid]);

  useEffect(() => {
    if (record) {
      if (record.uid !== recordUid) {
        if (datastoreUid === 'mirlyn' && recordUid.length === 9) {
          // treat as an aleph id
          navigate(`/catalog/record/${record.uid}`);
        } else if (datastoreUid === 'onlinejournals' && recordUid.length === 9) {
          // treat as an aleph id
          navigate(`/onlinejournals/record/${record.uid}`);
        } else if (record.alt_ids.includes(recordUid)) {
          navigate(`/${datastore.slug}/record/${record.uid}`);
        } else {
          requestRecord({ recordUid, datastoreUid });
        }
      }

      const activeDatastore = findWhere(datastores.datastores, {
        uid: datastores.active
      });

      setDocumentTitle([
        [].concat(record.names).join().slice(0, 120),
        'Record',
        activeDatastore.name
      ]);
    }
  }, [record, recordUid, datastores, navigate, datastore.slug, datastoreUid]);

  if (!record) {
    return (
      <div className='container container-narrow y-spacing'>
        <Breadcrumb
          items={[
            {
              text: `${datastore.name}`,
              to: `/${datastore.slug}${document.location.search}`
            },
            { text: 'Record' }
          ]}
        />
        <FullRecordPlaceholder />
      </div>
    );
  }

  if (record.status === 404) {
    return <NoMatch />;
  }

  // Check if the record in state matches the record ID in the URL
  // If they don't match, then the new record is still being fetched.
  const recordUidValue = getFieldValue(getField(record.fields, 'id'))[0];
  if (recordUidValue !== recordUid) {
    return (
      <div className='container container-narrow'>
        <GoToList list={list} datastore={datastore} />
        <FullRecordPlaceholder />
      </div>
    );
  }

  const inDatastore = ['catalog', 'onlinejournals'].includes(datastore.slug);

  return (
    <div className='container container-narrow full-record-page-container y-spacing'>
      <Breadcrumb
        items={[
          {
            text: `${datastore.name}`,
            to: `/${datastore.slug}${document.location.search}`
          },
          { text: 'Record' }
        ]}
      />
      <GoToList list={list} datastore={datastore} />
      <div className={`container__rounded full-record-container ${isInList(list, record.uid) ? 'record--highlight' : ''}`}>
        <RecordFullFormats formats={record.formats} />
        <div className='record-container'>
          <div className='full-record-title-and-actions-container'>
            <H1 className='full-record-title'>
              {[].concat(record.names).map((title, index) => {
                if (index > 0) {
                  return (
                    <span className='vernacular vernacular-record-title' key={index}>
                      <TrimString string={title} expandable />
                    </span>
                  );
                }
                return (
                  <TrimString string={title} expandable key={index} />
                );
              })}
              <RecommendedResource record={record} />
            </H1>
            <AddToListButton item={record} />
          </div>
          <RecordDescription record={record} />
          <Zotero record={record} />
          <h2 className='full-record__record-info'>Record info:</h2>
          <RecordMetadata record={record} />
          {inDatastore &&
            <p>The University of Michigan Library aims to describe library materials in a
              way that respects the people and communities who create, use, and are
              represented in our collections. Report harmful or offensive language in catalog
              records, finding aids, or elsewhere in our collections anonymously through
              our <Anchor href='https://docs.google.com/forms/d/e/1FAIpQLSfSJ7y-zqmbNQ6ssAhSmwB7vF-NyZR9nVwBICFI8dY5aP1-TA/viewform'>metadata feedback form</Anchor>.
              More information at <Anchor href='https://www.lib.umich.edu/about-us/policies/remediation-harmful-language-library-metadata'>Remediation of Harmful Language.</Anchor>
            </p>}
        </div>
        <section aria-labelledby='available-at'>
          <div
            className='record-container'
            style={{ paddingBottom: '0.25rem' }}
          >
            <h2 className='full-record__record-info' id='available-at'>
              Available at:
            </h2>
          </div>
          <ResourceAccess record={record} />
        </section>
      </div>
      <div className='full-record__actions-container'>
        <h2 className='lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none'>
          Actions{' '}
          <span className='text-small lists-actions__heading-tag'>
            Select what to do with this record.
          </span>
        </h2>
        <ActionsList
          setActive={setActiveAction}
          active={activeAction}
          prejudice={prejudiceInstance}
          datastore={datastore}
          record={record}
        />
      </div>
      {inDatastore && (() => {
        const indexingDate = findWhere(record.fields, { uid: 'indexing_date' });
        if (!indexingDate) return null;
        return (
          <p style={{ color: 'var(--search-color-grey-600)', marginTop: 0, order: 3 }}>
            <span style={{ fontWeight: 600 }}>{indexingDate.name}:</span> {indexingDate.value}
          </p>
        );
      })()}
      {datastoreUid === 'mirlyn' && <ViewMARC record={record} />}
    </div>
  );
};

export default FullRecord;
