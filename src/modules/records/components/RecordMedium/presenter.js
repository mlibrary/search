import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import AccessList from '../AccessList';
import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
  displayLoadingFeedback
} from '../../utilities';

function RecordMedium({ record, activeDatastore }) {
  const title = record.names[0];
  const displayFields = filterDisplayFields({
    fields: record.fields,
    type: 'medium',
    datastore: activeDatastore
  });
  const access = filterAccessFields({
    fields: record.fields,
    type: 'access',
    datastore: activeDatastore,
  });
  const datastoreSlug = getDatastoreSlugByUid(activeDatastore);
  const idField = getField(record.fields, 'id');
  const isLoading = displayLoadingFeedback(activeDatastore) && record.loading_holdings;

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

        <AccessList access={access} holdings={record.holdings} loading={isLoading} />
      </li>
    )
  }

  return (
    <li className="record">
      <div className="record-container">
        <h3 className="record-title">{title}</h3>
        <FieldList fields={displayFields} />
      </div>

      <AccessList access={access} />
    </li>
  );
}

export default RecordMedium;
