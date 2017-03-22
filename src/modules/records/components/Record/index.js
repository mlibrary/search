import React from 'react';
import { Link } from 'react-router';

import { Icon } from '../../../core';
import FieldList from '../RecordFieldList';
import {
  AccessList,
  AccessItem,
} from '../AccessList';

import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
  getHoldings
} from '../../utilities';

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type } = this.props
    const title = record.names ? record.names[0] : 'no title';
    const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
    const recordUidField = getField(record.fields, 'id');
    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: type,
      datastore: datastoreUid
    });
    const access = filterAccessFields({
      fields: record.fields,
      datastore: datastoreUid,
    });
    const holdings = getHoldings({
      holdings: record.holdings,
      datastoreUid: datastoreUid
    })

    if (recordUidField) {
      const recordUid = recordUidField.value

      return (
        <li className="record">
          <div className="record-container">
            <h3 className="record-title">
              <Link
                className="record-title-link"
                to={`/${datastoreSlug}/record/${recordUid}`}
              >
                {title}
              </Link>
            </h3>
            <FieldList fields={displayFields} />
          </div>

          {record.loadingHoldings ? (
            <div className="access-container access-placeholder-container">
              <div className="placeholder placeholder-access placeholder-inline"></div>
              <div className="placeholder placeholder-inline"></div>
            </div>
          ) : (
            <div className="access-container">
              {access && (
                <AccessList>
                  {access.map((item, index) => (
                    <AccessItem key={index} {...item} />
                  ))}
                </AccessList>
              )}
              {holdings.length > 0 && (
                <div className="holdings-container">
                  {holdings.map((holdingsGroup, index) => (
                    <AccessList key={holdingsGroup.uid}>
                      {holdingsGroup.holdings.map((holding, index) => (
                        <li className="access-item" key={index}>
                          <span className="holding-detail
                             holding-detail-label">{holding.label}</span>
                          <a href={holding.link} className="underline access-link">{holding.linkText}</a>
                          <HoldingStatus status={holding.status} />
                          <span className="holding-detail holding-detail-location">{holding.location}</span>
                          <span className="holding-detail">{holding.callnumber}</span>
                          <span className="holding-detail">{holding.source}</span>
                        </li>
                      ))}
                    </AccessList>
                  ))}
                </div>
              )}
            </div>
          )}
        </li>
      )
    }

    return null
  }
}

const HoldingStatus = ({ status }) => {
  if (status) {
    switch (status.trim()) {
      case 'On shelf':
        return (
          <span className="holding-detail holding-detail-on-shelf">
            <Icon name="check" /> {status}
          </span>
        )
      case 'Missing':
        return (
          <span className="holding-detail holding-detail-missing">
            <Icon name="alert" /> {status}
          </span>
        )
      default:
        // do nothing
    }

    const checkedOutindex = status.indexOf('Checked out:')

    if (checkedOutindex !== -1) {
      return (
        <span className="holding-detail holding-detail-checked-out">
          <Icon name="timetable" />{status.substr(0, 11)}
        </span>
      )
    }
  }

  return <span className="holding-detail">{status}</span>
}

export default Record;
