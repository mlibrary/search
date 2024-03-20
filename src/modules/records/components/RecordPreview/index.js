import React from 'react';
import { Anchor } from '../../../reusable';
import Icon from '../../../reusable/components/Icon';
import { Icon as SearchIcon, TrimString } from '../../../core';
import { getField, getFieldValue } from '../../utilities';
import { getDatastoreSlugByUid } from '../../../pride';
import { RecommendedResource, Zotero, RecordMetadata } from '../../../records';
import PropTypes from 'prop-types';

function Header ({ record, datastoreUid, searchQuery }) {
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0];
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
      <h3 className='record-preview-heading'>
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
              <SearchIcon name='launch' />
            </Anchor>
          );
        })}
        <RecommendedResource record={record} />
      </h3>
    </>
  );
};

Header.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string,
  searchQuery: PropTypes.string
};

function Footer ({ record, datastoreUid }) {
  // No access/holding options or are Catalog or Guides and More datastores.
  if (['mirlyn', 'website'].includes(datastoreUid) || !(record.resourceAccess && record.resourceAccess[0])) {
    return null;
  }

  const outage = getFieldValue(getField(record.fields, 'outage'))[0];

  return (
    <>
      {outage && (
        <p
          style={{
            color: 'var(--search-color-red-300)',
            marginBottom: '0',
            marginTop: '0.5rem'
          }}
        >
          <Icon icon='warning' /> {outage}
        </p>
      )}
      {record.resourceAccess[0].rows.map((row, index) => {
        const accessCell = row[0];
        if (!accessCell?.previewEligible) {
          return null;
        }
        return (
          <p
            className='record-preview-link'
            style={{
              marginBottom: '0'
            }}
            key={record.uid + '-resource-' + index}
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

Footer.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string
};

function RecordPreview (props) {
  return (
    <article className='record-preview'>
      <Header
        record={props.record}
        datastoreUid={props.datastoreUid}
        searchQuery={props.searchQuery}
      />
      <RecordMetadata record={props.record} kind='condensed' />
      <Zotero record={props.record} />
      <Footer record={props.record} datastoreUid={props.datastoreUid} />
    </article>
  );
}

RecordPreview.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string,
  searchQuery: PropTypes.string
};

export default RecordPreview;
