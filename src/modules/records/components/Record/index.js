import React from 'react';
import { Link } from 'react-router-dom'

import FieldList from '../RecordFieldList';
import {
  AccessItem,
} from '../AccessList';
import {
  ShowAllList,
  TrimString,
  Icon
} from '../../../core'
import Holdings from '../Holdings';

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
    </h3>
  )
}

const Footer = ({
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
                <ShowAllList
                  length={access.length}
                  show={1}
                  listClass={'access-list'}>
                    {access.map((item, index) => (
                      <AccessItem key={index} item={item} />
                    ))}
                </ShowAllList>
              </div>
            </div>
          )}
          {holdings && (
            <div className="holdings-condensed"><Holdings holdings={holdings} /></div>
          )}
        </div>
      )}
    </div>
  )
}

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type, searchQuery, institution } = this.props
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

    if (recordUidField) {

      return (
        <article className="record">
          <div className="record-container">
            <Header
              record={record}
              datastoreUid={datastoreUid}
              searchQuery={searchQuery}
            />
            <FieldList fields={displayFields} datastoreUid={datastoreUid} institution={institution} />
          </div>

          {datastoreUid === 'website' ? null : (
            <Footer
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
