/** @jsxImportSource @emotion/react */
import React from 'react';
import { Anchor } from '../../../reusable';
import { TrimString, Icon } from '../../../core';
import { RecommendedResource, RecordMetadata } from '../../../records';
import { getDatastoreSlugByUid } from '../../../pride';
import { getField, getFieldValue } from '../../utilities';
import { AddToListButton, isInList } from '../../../lists';
import Zotero from '../Zotero';
import { COLORS, SPACING } from '../../../reusable/umich-lib-core-temp';
import ResourceAccess from '../../../resource-acccess';
import PropTypes from 'prop-types';

function Header ({ record, datastoreUid, searchQuery }) {
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0];
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const pictureField = getField(record.fields, 'picture');
  let recordTitleLink = `/${datastoreSlug}/record/${recordUid}${searchQuery}`;
  let recordHeaderClassName = 'record-title';

  // Special Library Website case
  if (datastoreUid === 'website') {
    const accessUrlField = getField(record.fields, 'access_url');
    if (accessUrlField) {
      recordTitleLink = accessUrlField.value;
    }
    if (pictureField) {
      recordHeaderClassName += ' record-person__header-has-picture';
    }
  }

  return (
    <h3 className={recordHeaderClassName}>
      {pictureField && (
        <img
          src={pictureField.value[0]}
          alt=''
          className='record-person__profile-picture'
        />
      )}
      <span
        css={{
          marginRight: SPACING['2XS'],
          color: COLORS.neutral['300']
        }}
      >
        {record.position + 1}.
      </span>
      {[].concat(record.names).map((title, index) => {
        if (index > 0) {
          return (
            <span className='vernacular vernacular-record-title' key={index}>
              <TrimString string={title} />
            </span>
          );
        }
        return (
          <span key={index}>
            <Anchor
              to={datastoreUid !== 'website' ? recordTitleLink : ''}
              href={datastoreUid === 'website' ? recordTitleLink : ''}
              className='record-title-link'
            >
              <TrimString string={title} />
            </Anchor>
            {datastoreUid === 'website' && <Icon name='launch' />}
          </span>
        );
      })}
      <RecommendedResource record={record} />
    </h3>
  );
};

Header.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string,
  searchQuery: PropTypes.string
};

function Record (props) {
  if (!getField(props.record.fields, 'id')) {
    return null;
  }

  const { record } = props;

  return (
    <article className={isInList(props.list, record.uid) ? 'record record--highlight' : 'record'}>
      <div className='record-container record-medium-container'>
        <div className='record-title-and-actions-container '>
          <Header
            record={record}
            datastoreUid={props.datastoreUid}
            searchQuery={props.searchQuery}
          />
          <AddToListButton item={record} />
        </div>
        <Zotero record={record} />
        <RecordMetadata record={record} />
      </div>

      <div
        css={{
          borderBottom: `solid 1px ${COLORS.neutral[100]}`
        }}
      >
        <h4 className='visually-hidden'>{record.names[0]} is available at:</h4>
        <ResourceAccess record={record} />
      </div>
    </article>
  );
}

Record.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string,
  searchQuery: PropTypes.string,
  list: PropTypes.array
};

export default Record;
