import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import {
  AccessList,
  AccessItem,
} from '../AccessList';
import HoldingStatus from '../HoldingStatus';
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
    const titles = record.names ? [].concat(record.names) : [].concat('no title');
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
            {titles.map((title, index) => (
              <div key={index}>
                <Link
                  className="record-title-link"
                  to={`/${datastoreSlug}/record/${recordUid}`}
                >
                  {title}
                </Link>
              </div>
            ))}
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
              {access.length > 0 && (
                <AccessList length={access.length}>
                  {access.map((item, index) => (
                    <AccessItem key={index} item={item} />
                  ))}
                </AccessList>
              )}
              {holdings.length > 0 && (
                <div className="holdings-container">
                  {holdings.map((holdingsGroup, index) => (
                    <HoldingsList
                      holdingsGroup={holdingsGroup}
                      key={holdingsGroup.uid}
                    />
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

class HoldingsList extends React.Component {
  render() {
    const { holdingsGroup } = this.props;

    return (
      <AccessList length={holdingsGroup.holdings.length}>
        {holdingsGroup.holdings.map((holding, index) => (
          <li className="access-item" key={index}>
            <span className="access-detail
               holding-detail-label">{holding.label}</span>
             <a href={holding.link} className="underline access-detail">{holding.linkText}</a>
            <HoldingStatus status={holding.status} />
            <span className="access-detail holding-detail-location">{holding.location}</span>
            <span className="access-detail">{holding.callnumber}</span>
            <span className="access-detail">{holding.source}</span>
          </li>
        ))}
      </AccessList>
    )
  }
}

export default Record;
