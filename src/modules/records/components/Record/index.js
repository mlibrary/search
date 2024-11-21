import { AddToListButton, isInList } from '../../../lists';
import { Anchor, Icon } from '../../../reusable';
import { getField, getFieldValue } from '../../utilities';
import { getDatastoreSlugByUid } from '../../../pride';
import { Metadata } from '../../../metadata';
import PropTypes from 'prop-types';
import React from 'react';
import { RecommendedResource } from '../../../records';
import { ResourceAccess } from '../../../resource-acccess';
import { TrimString } from '../../../core';
import { useLocation } from 'react-router-dom';
import Zotero from '../Zotero';

const Header = ({ datastoreUid, record }) => {
  const location = useLocation();
  const [recordUid] = getFieldValue(getField(record.fields, 'id'));
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
      <span className='margin-right__2xs text-grey__light'>
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
              to={datastoreUid === 'website' ? '' : recordTitleLink}
              href={datastoreUid === 'website' ? recordTitleLink : ''}
              className='record-title-link'
            >
              <TrimString string={title} />
            </Anchor>
            {datastoreUid === 'website' && <Icon icon='open_in_new' className='icon' size='1.125rem' />}
          </span>
        );
      })}
      <RecommendedResource {...{ fields: record.fields }} />
    </h3>
  );
};

Header.propTypes = {
  datastoreUid: PropTypes.string,
  record: PropTypes.object
};

const Record = ({ datastoreUid, list, record }) => {
  if (!getField(record.fields, 'id')) {
    return null;
  }

  return (
    <article className={`container__rounded record ${(isInList(list, record.uid) ? ' record--highlight' : '')}`}>
      <div className='record-container record-medium-container'>
        <div className='record-title-and-actions-container'>
          <Header {...{ datastoreUid, record }} />
          <AddToListButton item={record} />
        </div>
        <Zotero {...{ fields: record.fields }} />
        <Metadata {...{ metadata: record.metadata }} />
      </div>

      <div className='record-holders-container'>
        <h4 className='visually-hidden'>{record.names[0]} is available at:</h4>
        <ResourceAccess {...{ record }} />
      </div>
    </article>
  );
};

Record.propTypes = {
  datastoreUid: PropTypes.string,
  list: PropTypes.array,
  record: PropTypes.object
};

export default Record;
