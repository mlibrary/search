import React from 'react';

import FieldList from '../RecordFieldList';
import {
  AccessItem,
} from '../AccessList';
import {
  ShowAllList,
  TrimLink,
  TrimString,
} from '../../../core'
import HoldingStatus from '../HoldingStatus';

import {
  getDatastoreSlugByUid
} from '../../../pride';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
  getHoldings,
  getShowAllText,
  hasRecordFullView
} from '../../utilities';

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type, searchQuery } = this.props
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
    const hasFullView = hasRecordFullView({ datastoreUid })

    if (recordUidField) {
      const recordUid = recordUidField.value

      return (
        <li className="record">
          <div className="record-container">
            <h3 className="record-title">
            {titles.map((title, index) => (
              <div key={index}>
                {hasFullView ? (
                  <TrimLink
                    string={title}
                    linkClassName={"record-title-link"}
                    to={`/${datastoreSlug}/record/${recordUid}${searchQuery}`} />
                ) : (
                  <h2 className="record-title">
                    <TrimString string={title} />
                  </h2>
                )}
              </div>
            ))}
            </h3>
            <FieldList fields={displayFields} datastoreUid={datastoreUid} />
          </div>

          {record.loadingHoldings ? (
            <div className="access-container access-placeholder-container">
              <div className="placeholder placeholder-access placeholder-inline"></div>
              <div className="placeholder placeholder-inline"></div>
            </div>
          ) : (
            <div className="access-container">
              {access.length > 0 && (
                <div className="access-list-container">
                  <ShowAllList
                    length={access.length}
                    show={1}
                    name={name ? name : ''}
                    listClass={'access-list'}>
                      {access.map((item, index) => (
                        <AccessItem key={index} item={item} />
                      ))}
                  </ShowAllList>
                </div>
              )}
              {holdings.length > 0 && (
                <Holdings holdings={holdings} datastoreUid={datastoreUid} />
              )}
            </div>
          )}
        </li>
      )
    }

    return null
  }
}

const Holdings = ({ holdings, datastoreUid }) => {
  return (
    <div className="holdings-container">
      {holdings.map((holdingsGroup, index) => {
        const length = holdingsGroup.holdings.length
        const showAllText = getShowAllText({
          holdingUid: holdingsGroup.uid,
          datastoreUid
        }) || ''

        return (
          <div key={index} className="access-list-container">
            <ShowAllList
              length={length}
              show={1}
              name={showAllText ? showAllText : ''}
              listClass={'access-list'}>
                {holdingsGroup.holdings.map((holding, index) => (
                  <li className="access-item" key={index}>
                    <span className="access-detail
                       holding-detail-label">{holding.label}</span>
                     <a href={holding.link} className="underline access-detail">{holding.linkText}</a>
                    <HoldingStatus status={holding.status} />
                    <span className="access-detail holding-detail-location">{holding.location}</span>
                    <span className="access-detail">{holding.description}</span>
                    <span className="access-detail">{holding.callnumber}</span>
                    <span className="access-detail">{holding.source}</span>
                  </li>
                ))}
            </ShowAllList>
          </div>
        )
      })}
    </div>
  )
}

export default Record;
