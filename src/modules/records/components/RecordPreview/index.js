import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import AccessList from '../AccessList';
import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
} from '../../utilities';

function RecordMedium({ record, activeDatastore, loading }) {
  const title = record.names[0];
  const displayFields = filterDisplayFields({
    fields: record.fields,
    type: 'preview',
    datastore: activeDatastore
  });
  const access = filterAccessFields({
    fields: record.fields,
    type: 'access',
    datastore: activeDatastore,
  });
  const datastoreSlug = getDatastoreSlugByUid(activeDatastore);
  const idField = getField(record.fields, 'id');

  if (idField) {
    const recordUid = idField.value;
    const recordFulllink = `/${datastoreSlug}/record/${recordUid}`;
    return (
      <li className="record">
        <div className="record-container">
          <h3 className="record-title">
            <Link className="record-title-link" to={`${recordFulllink}`}>{title}</Link></h3>
          <FieldList fields={displayFields} />
        </div>
        <AccessList access={access} holdings={record.holdings} loading={record.loading_holdings} />
      </li>
    )
  }

  return (
    <li className="record">
      <div className="record-container">
        <h3 className="record-title">{title}</h3>
        <FieldList fields={displayFields} />
      </div>
      <AccessList access={access} holdings={record.holdings} />
    </li>
  );
}

export default RecordMedium;
