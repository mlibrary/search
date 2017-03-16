import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import {
  AccessList,
  AccessItem
} from '../AccessList';

import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
} from '../../utilities';

class Record extends React.Component {
  render() {
    const { record, datastoreUid, type } = this.props
    const title = record.names ? record.names[0] : 'no title';
    const displayFields = filterDisplayFields({
      fields: record.fields,
      type: type,
      datastore: datastoreUid
    });
    const access = filterAccessFields({
      fields: record.fields,
      type: 'access',
      holdings: record.holdings,
      datastore: datastoreUid,
    });
    const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
    const recordUidField = getField(record.fields, 'id');

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

          <div className="access-container">
          {access && (
            <AccessList>
              {access.map((item, index) => (
                <AccessItem key={index} {...item} />
              ))}
            </AccessList>
          )}
          </div>
        </li>
      )
    }

    return null
  }
}

export default Record;
