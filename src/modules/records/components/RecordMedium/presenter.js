import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields
} from '../../utilities';

function RecordMedium({ record, activeDatastore }) {
  const title = record.names[0];
  const displayFields = filterDisplayFields({
    fields: record.fields,
    type: 'medium',
    datastore: activeDatastore
  });
  const datastoreSlug = getDatastoreSlugByUid(activeDatastore);
  const idField = getField(record.fields, 'id');

  if (idField) {
    const recordUid = idField.value;
    const recordFulllink = `/${datastoreSlug}/record/${recordUid}`;
    return (
      <li className="record">
        <h3 className="record-title">
          <Link className="record-title-link" to={`${recordFulllink}`}>{title}</Link></h3>
        <FieldList fields={displayFields} />
      </li>
    )
  }

  return (
    <li className="record">
      <h3 className="record-title">{title}</h3>
      <FieldList fields={displayFields} />
    </li>
  );
}

export default RecordMedium;
