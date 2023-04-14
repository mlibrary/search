import React from 'react';
import { Link } from 'react-router-dom';
import { INTENT_COLORS } from '../../../reusable/umich-lib-core-temp';
import Icon from '../../../reusable/components/Icon';
import { Icon as SearchIcon, TrimString } from '../../../core';
import { getField, getFieldValue } from '../../utilities';
import { getDatastoreSlugByUid } from '../../../pride';
import { RecommendedResource, Zotero, RecordMetadata } from '../../../records';

const Header = ({ record, datastoreUid, searchQuery }) => {
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
    <header>
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
              <Link
                to={recordTitleLink}
                className='record-title-link'
                key={index}
              >
                <TrimString string={title} />
              </Link>
            );
          }
          return (
            <span key={index}>
              <a
                href={recordTitleLink}
                className='record-title-link'
              >
                <TrimString string={title} />
              </a>
              <SearchIcon name='launch' />
            </span>
          );
        })}
        <RecommendedResource record={record} />
      </h3>
    </header>
  );
};

const Footer = ({ record, datastoreUid }) => {
  // No access/holding options for Mirlyn for preview records.
  if (datastoreUid === 'mirlyn' || datastoreUid === 'website') {
    return null;
  }

  const outage = getFieldValue(getField(record.fields, 'outage'))[0];

  if (record.resourceAccess && record.resourceAccess[0]) {
    const accessCell = record.resourceAccess[0].rows[0][0];
    return (
      <footer>
        {outage && (
          <p
            style={{
              color: INTENT_COLORS.error,
              marginBottom: '0',
              marginTop: '0.5rem'
            }}
          >
            <Icon icon='warning' /> {outage}
          </p>
        )}
        <a
          className='record-preview-link'
          href={accessCell.href}
        >
          {accessCell.text}
        </a>
      </footer>
    );
  }

  // TODO
  // Add "Go to <thing>" here with resource access component.

  return null;
};

class RecordPreview extends React.Component {
  render () {
    const { record, datastoreUid, searchQuery } = this.props;

    return (
      <article className='record-preview'>
        <Header
          record={record}
          datastoreUid={datastoreUid}
          searchQuery={searchQuery}
        />
        <RecordMetadata record={record} kind='condensed' />
        <Zotero record={record} />
        <Footer record={record} datastoreUid={datastoreUid} />
      </article>
    );
  }
}

export default RecordPreview;
