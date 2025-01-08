import { Anchor, Icon } from '../../../reusable';
import { getField, getFieldValue } from '../../utilities';
import { Metadata, RecommendedResource, Zotero } from '../../../records';
import { getDatastoreSlugByUid } from '../../../pride';
import React from 'react';
import { TrimString } from '../../../core';

const Header = ({ datastoreUid, record, searchQuery }) => {
  const [recordUid] = getFieldValue(getField(record.fields, 'id'));
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const hasFullView = datastoreUid !== 'website';
  let recordTitleLink = `/${datastoreSlug}/record/${recordUid}${searchQuery}`;

  // Special Library Website case
  if (datastoreUid === 'website') {
    const accessUrlField = getField(record.fields, 'access_url');
    if (accessUrlField) {
      recordTitleLink = accessUrlField.value;
    }
  }

  return (
    <>
      <h3 className='size__inherit strong margin__none'>
        {[].concat(record.names).map((title, index) => {
          if (index > 0) {
            return (
              <span className='vernacular vernacular-record-title' key={index}>
                <TrimString string={title} />
              </span>
            );
          }
          if (hasFullView) {
            return (
              <Anchor
                to={recordTitleLink}
                className='record-title-link'
                key={index}
              >
                <TrimString string={title} />
              </Anchor>
            );
          }
          return (
            <Anchor
              href={recordTitleLink}
              className='record-title-link'
              key={index}
            >
              <TrimString string={title} />
              <Icon icon='open_in_new' className='icon margin-left__2xs text-grey' size='1.125rem' />
            </Anchor>
          );
        })}
        <RecommendedResource fields={record.fields} />
      </h3>
    </>
  );
};

const Footer = ({ datastoreUid, record }) => {
  // No access/holding options or are Catalog or Guides and More datastores.
  if (['mirlyn', 'website'].includes(datastoreUid) || !(record.resourceAccess?.[0])) {
    return null;
  }

  const [outage] = getFieldValue(getField(record.fields, 'outage'));

  return (
    <>
      {outage && (
        <p className='margin-bottom__none margin-top__xs intent__error'>
          <Icon icon='warning' /> {outage}
        </p>
      )}
      {record.resourceAccess[0].rows.map((row, index) => {
        const [accessCell] = row;
        if (!accessCell?.previewEligible) {
          return null;
        }
        return (
          <p
            className='record-preview-link margin-bottom__none'
            key={`${record.uid}-resource-${index}`}
          >
            <Anchor href={accessCell.href}>
              {accessCell.text}
            </Anchor>
          </p>
        );
      })}
    </>
  );
};

const RecordPreview = ({ datastoreUid, record, searchQuery }) => {
  return (
    <article className='record-preview'>
      <Header {...{ datastoreUid, record, searchQuery }} />
      <Metadata {...{ metadata: record.metadata }} />
      <Zotero {...{ fields: record.fields }} />
      <Footer {...{ record, searchQuery }} />
    </article>
  );
};

export default RecordPreview;
