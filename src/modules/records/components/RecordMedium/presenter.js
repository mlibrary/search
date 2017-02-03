import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import { getDatastoreSlugByUid } from '../../../../pride-interface';
import { getField } from '../../utilities';

function RecordMedium({ record, activeDatastore }) {
  const title = record.names[0];
  const fields = record.fields;
  const datastore_slug = getDatastoreSlugByUid(activeDatastore);
  const id_field = getField(fields, 'id');

  if (id_field) {
    const record_uid = id_field.value;
    const full_record_link = `/${datastore_slug}/record/${record_uid}`;
    return (
      <li className="record">
        <h3 className="record-title"><Link to={`${full_record_link}`}>{title}</Link></h3>
        <FieldList fields={fields} />
      </li>
    );
  }

  return (
    <li className="record">
      <h3 className="record-title">{title}</h3>
      <FieldList fields={fields} />
    </li>
  );
}

export default RecordMedium;
