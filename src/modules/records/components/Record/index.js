import React from 'react';
import { Link } from 'react-router-dom'

import FieldList from '../RecordFieldList';
import {
  TrimString,
  Icon
} from '../../../core'
import {
  RecommendedResource
}  from '../../../records'
import {
  getDatastoreSlugByUid
} from '../../../pride';
import {
  getField,
  getFieldValue,
  filterDisplayFields,
  hasRecordFullView,
  getAccessField
} from '../../utilities';
import {
  AddToListButton,
  isInList
} from '../../../lists'
import ReactGA from 'react-ga'
import {
  FavoriteRecord,
  FavoriteTags
} from '../../../favorites'
import ResourceAccess from '@umich-lib-ui/resource-access'

const Header = ({
  record,
  datastoreUid,
  searchQuery
}) => {
  const recordUid = getFieldValue(getField(record.fields, 'id'))[0]
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const pictureField = getField(record.fields, 'picture')
  let recordUrl = `/${datastoreSlug}/record/${recordUid}${searchQuery}`
  let recordHeaderClassName = 'record-title'
  const hasFullView = hasRecordFullView({ datastoreUid })

  if (datastoreUid === 'website') {
    const accessField = getAccessField({ record, datastoreUid })

    if (accessField && accessField.value) {
      recordUrl = accessField.value
    }

    if (pictureField) {
      recordHeaderClassName = 'record-title record-person__header-has-picture '
    }
  }

  return (
    <h3 className={recordHeaderClassName}>
      {pictureField && (
        <img src={pictureField.value[0]} alt="" className="record-person__profile-picture" />
      )}
      {hasFullView ? (
        <Link
          to={recordUrl}
          className="record-title-link"
          onClick={() => {
            ReactGA.event({
              action: 'Click',
              category: 'Medium View',
              label: `Full view from medium ${datastoreUid}`
            })
          }}
        >
          {[].concat(record.names).map((title, index) => (
            <span key={index}>
              <TrimString string={title} />
            </span>
          ))}
        </Link>
      ) : (
        <span>
          <a
            href={recordUrl}
            className="record-title-link"
            onClick={() => {
              ReactGA.event({
                action: 'Click',
                category: 'Medium View',
                label: `Full view from medium ${datastoreUid}`
              })
            }}
          >
            {[].concat(record.names).map((title, index) => (
              <span key={index}>
                <TrimString string={title} />
              </span>
            ))}
          </a>
          <Icon name="launch" />
        </span>
      )}
      <RecommendedResource record={record} />
    </h3>
  )
}

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type, searchQuery, institution, list } = this.props
    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: type,
      datastore: datastoreUid
    });
    const recordUidField = getField(record.fields, 'id');
    const inList = isInList(list, record.uid)
    const recordClassName = inList ? 'record record--highlight' : 'record'

    if (recordUidField) {
      return (
        <article className={recordClassName}>
          <div className="record-container record-medium-container">
            <div className="record-title-and-actions-container ">
              <Header
                record={record}
                datastoreUid={datastoreUid}
                searchQuery={searchQuery}
              />
              <AddToListButton
                item={record}
              />
              <FavoriteRecord
                record={record}
                datastore={datastoreUid}
              />
            </div>
            <FavoriteTags
              record={record}
              datastore={datastoreUid}
            />
            <FieldList
              fields={displayFields}
              datastoreUid={datastoreUid}
              institution={institution}
            />
          </div>

          {datastoreUid === 'website' ? null : (
            <React.Fragment>
              {record.loadingHoldings ? (
                <div className="access-container access-placeholder-container">
                  <div className="placeholder placeholder-access placeholder-inline"></div>
                  <div className="placeholder placeholder-inline"></div>
                </div>
              ) : (
                <React.Fragment>
                  {record.resourceAccess.map(ra => <ResourceAccess {...ra} />)}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </article>
      )
    }

    return null
  }
}

export default Record;
