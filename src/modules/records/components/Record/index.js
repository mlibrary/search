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
import Holdings from '../Holdings';

import {
  getDatastoreSlugByUid
} from '../../../pride';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
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
    const holdings = record.holdings
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
        </li>
      )
    }

    return null
  }
}

export default Record;
