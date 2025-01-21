import {
  ActionsList,
  AddToListButton,
  GoToList,
  isInList,
  prejudice
} from '../../../lists';
import { Anchor, Breadcrumb, H1 } from '../../../reusable';
import {
  FullRecordPlaceholder,
  Metadata,
  RecommendedResource,
  RecordFullFormats,
  ViewMARC,
  Zotero
} from '../../../records';
import { getField, getFieldValue } from '../../utilities';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findWhere } from '../../../reusable/underscore';
import { NoMatch } from '../../../pages';
import { requestRecord } from '../../../pride';
import { ResourceAccess } from '../../../resource-acccess';
import { setDocumentTitle } from '../../../a11y';
import { ShelfBrowse } from '../../../browse';
import { TrimString } from '../../../core';
import { useSelector } from 'react-redux';
let prejudiceInstance = prejudice.createVariableStorageDriverInstance();

const FullRecord = () => {
  const [active, setActive] = useState('');

  const { recordUid } = useParams();
  const navigate = useNavigate();

  const { record } = useSelector((state) => {
    return state.records;
  });
  const { active: datastoreUid, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const { [datastoreUid]: list = [] } = useSelector((state) => {
    return state.lists;
  });

  const datastore = findWhere(datastores, {
    uid: datastoreUid
  });

  const { name: datastoreName, slug: datastoreSlug } = datastore;

  useEffect(() => {
    requestRecord({ datastoreUid, recordUid });
    prejudiceInstance = prejudice.createVariableStorageDriverInstance();
    prejudiceInstance.clearRecords();
    prejudiceInstance.addRecord({ datastoreUid, recordUid });
  }, [datastoreUid, recordUid]);

  useEffect(() => {
    if (record) {
      if (record.uid !== recordUid) {
        if (datastoreUid === 'mirlyn' && recordUid.length === 9) {
          // Treat as an aleph id
          navigate(`/catalog/record/${record.uid}`);
        } else if (datastoreUid === 'onlinejournals' && recordUid.length === 9) {
          // Treat as an aleph id
          navigate(`/onlinejournals/record/${record.uid}`);
        } else if (record.alt_ids.includes(recordUid)) {
          navigate(`/${datastoreSlug}/record/${record.uid}`);
        } else {
          requestRecord({ datastoreUid, recordUid });
        }
      }

      const { name: activeDatastore } = findWhere(datastores, {
        uid: datastoreUid
      });

      setDocumentTitle([
        [].concat(record.names).join().slice(0, 120),
        'Record',
        activeDatastore
      ]);
    }
  }, [record, recordUid, datastores, navigate, datastoreSlug]);

  if (!record) {
    return (
      <div className='container container-narrow y-spacing'>
        <Breadcrumb
          items={[
            {
              text: `${datastoreName}`,
              to: `/${datastoreSlug}${document.location.search}`
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

  /*
   * Check if the record in state matches the record ID in the URL
   * If they don't match, then the new record is still being fetched.
   */
  const [recordUidValue] = getFieldValue(getField(record.fields, 'id'));
  if (recordUidValue !== recordUid) {
    return (
      <div className='container container-narrow'>
        <GoToList {...{ datastore, list }} />
        <FullRecordPlaceholder />
      </div>
    );
  }

  const [description] = getFieldValue(getField(record.fields, 'abstract') || getField(record.fields, 'description'));

  const inDatastore = ['catalog', 'onlinejournals'].includes(datastoreSlug);

  return (
    <div className='container container-narrow full-record-page-container y-spacing'>
      <Breadcrumb
        items={[
          {
            text: `${datastoreName}`,
            to: `/${datastoreSlug}${document.location.search}`
          },
          { text: 'Record' }
        ]}
      />
      <GoToList {...{ datastore, list }} />
      <div className={`container__rounded full-record-container ${isInList(list, record.uid) ? 'record--highlight' : ''}`}>
        <RecordFullFormats {...{ formats: record.formats }} />
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
                  <TrimString key={index} string={title} expandable />
                );
              })}
              <RecommendedResource {...{ fields: record.fields }} />
            </H1>
            <AddToListButton {...{ item: record }} />
          </div>
          {description && <p className='full-record__description' dangerouslySetInnerHTML={{ __html: description }} />}
          <Zotero {...{ fields: record.fields }} />
          <h2 className='full-record__record-info'>Record info:</h2>
          <Metadata {...{ metadata: record.metadata }} />
          {inDatastore && (
            <p>
              The University of Michigan Library aims to describe its collections in a way that respects the people and communities who create, use, and are represented in them. We encourage you to
              {' '}
              <Anchor href='https://docs.google.com/forms/d/e/1FAIpQLSfSJ7y-zqmbNQ6ssAhSmwB7vF-NyZR9nVwBICFI8dY5aP1-TA/viewform'>contact us</Anchor>
              {' '}
              anonymously if you encounter harmful or problematic language in catalog records or finding aids. More information about our policies and practices is available at
              {' '}
              <Anchor href='https://www.lib.umich.edu/about-us/policies/remediation-harmful-language-descriptions-collection-material'>Remediation of Harmful Language</Anchor>
              .
            </p>
          )}
        </div>
        <section aria-labelledby='available-at'>
          <div className='record-container padding-bottom__2xs'>
            <h2 className='full-record__record-info' id='available-at'>
              Available at:
            </h2>
          </div>
          <ResourceAccess {...{ record }} />
        </section>
      </div>
      {datastoreUid === 'mirlyn' && <ShelfBrowse {...{ record }} />}
      <div className='full-record__actions-container'>
        <h2 className='lists-actions-heading u-display-inline-block u-margin-right-1 u-margin-bottom-none'>
          Actions
          {' '}
          <span className='text-small lists-actions__heading-tag'>
            Select what to do with this record.
          </span>
        </h2>
        <ActionsList {...{
          active,
          datastore,
          list,
          prejudice: prejudiceInstance,
          record,
          setActive
        }}
        />
      </div>
      {inDatastore && (() => {
        const { name: indexingName, value: indexingValue } = findWhere(record.fields, { uid: 'indexing_date' });
        if (!indexingValue) {
          return null;
        }
        return (
          <p className='margin-top__none text-grey full-record__date-last-indexed'>
            <span className='strong'>{indexingName || 'Date Last Indexed'}:</span> {indexingValue}
          </p>
        );
      })()}
      {datastoreUid === 'mirlyn' && <ViewMARC {...{ fields: record.fields }} />}
    </div>
  );
};

export default FullRecord;
