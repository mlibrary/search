import React from 'react';
import { useLocation } from 'react-router-dom';
import { Anchor, Icon } from '../../../reusable';
import { TrimString } from '../../../core';
import { RecommendedResource, RecordMetadata } from '../../../records';
import { getDatastoreSlugByUid } from '../../../pride';
import { getField, getFieldValue } from '../../utilities';
import { AddToListButton, isInList } from '../../../lists';
import Zotero from '../Zotero';
import { ResourceAccess } from '../../../resource-acccess';
import PropTypes from 'prop-types';

function Header ({ record, datastoreUid }) {
  const location = useLocation();
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0];
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const pictureField = getField(record.fields, 'picture');
  let recordTitleLink = `/${datastoreSlug}/record/${recordUid}${location.search}`;
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
        style={{
          marginRight: 'var(--search-spacing-2xs)',
          color: 'var(--ds-color-neutral-300)'
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
            {datastoreUid === 'website' && <Icon icon='open_in_new' className='icon' size='1.125rem' />}
          </span>
        );
      })}
      <RecommendedResource {...{ record }} />
    </h3>
  );
};

Header.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string
};

function Record ({ record, list, datastoreUid }) {
  if (!getField(record.fields, 'id')) {
    return null;
  }

  return (
    <article className={`container__rounded record ${(isInList(list, record.uid) ? ' record--highlight' : '')}`}>
      <div className='record-container record-medium-container'>
        <div className='record-title-and-actions-container '>
          <Header {...{ record, datastoreUid }} />
          <AddToListButton item={record} />
        </div>
        <Zotero {...{ record }} />
        <RecordMetadata {...{ record }} />
      </div>

      <div
        className='record-holders-container'
        style={{
          borderBottom: 'solid 1px var(--ds-color-neutral-100)'
        }}
      >
        <h4 className='visually-hidden'>{record.names[0]} is available at:</h4>
        <ResourceAccess {...{ record }} />
      </div>
    </article>
  );
}

Record.propTypes = {
  record: PropTypes.object,
  datastoreUid: PropTypes.string,
  list: PropTypes.array
};

export default Record;
