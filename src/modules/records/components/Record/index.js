import React from 'react';
import { Link } from 'react-router-dom'

import FieldList from '../RecordFieldList';
import {
  AccessItem,
} from '../AccessList';
import {
  ShowAllChildren,
  TrimString,
  Icon
} from '../../../core'
import Holdings from '../Holdings';
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
  filterAccessFields,
  hasRecordFullView,
  getAccessField
} from '../../utilities';
import {
  AddToListButton,
  isInList
} from '../../../lists'
import {
  FavoriteRecord,
  FavoriteTags
} from '../../../favorites'

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

const Access = ({
  record,
  access,
  holdings
}) => {
  return (
    <div>
      {record.loadingHoldings ? (
        <div className="access-container access-placeholder-container">
          <div className="placeholder placeholder-access placeholder-inline"></div>
          <div className="placeholder placeholder-inline"></div>
        </div>
      ) : (
        <div>
          {access.length > 0 && (
            <div className="access-container">
              <div className="access-list-container">
                <ShowAllChildren
                  length={access.length}
                  show={1}
                  listClass={'access-list'}>
                    {access.map((item, index) => (
                      <AccessItem key={index} item={item} />
                    ))}
                </ShowAllChildren>
              </div>
            </div>
          )}
          {holdings && (
            <div className="holdings-condensed"><Holdings holdings={holdings} headingLevel={4}/></div>
          )}
        </div>
      )}
    </div>
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
    const access = filterAccessFields({
      fields: record.fields,
      datastore: datastoreUid,
    });
    const holdings = record.holdings
    const recordUidField = getField(record.fields, 'id');
    const inList = isInList(list, record.uid)
    const recordClassName = inList ? 'record record--highlight' : 'record'

    if (recordUidField) {
      return (
        <article className={recordClassName}>
          <div className="record-container record-medium-container">
            <div>
              <Header
                record={record}
                datastoreUid={datastoreUid}
                searchQuery={searchQuery}
              />
              <FavoriteTags record={record} datastore={datastoreUid} />
              <FieldList fields={displayFields} datastoreUid={datastoreUid} institution={institution} />
            </div>
            <ul className="record-actions">
              <li className="record-actions-favorites"><FavoriteRecord record={record} datastore={datastoreUid} /></li>
              <li className="record-actions-lists"><AddToListButton item={record} /></li>
            </ul>
          </div>

          {datastoreUid === 'website' ? null : (
            <Access
              record={record}
              access={access}
              holdings={holdings}
            />
          )}
        </article>
      )
    }

    return null
  }
}

export default Record;
