import React from 'react';
import { Link } from 'react-router';

import FieldList from '../RecordFieldList';
import AccessList from '../AccessList';
import { getDatastoreSlugByUid } from '../../../../pride-interface';
import {
  getField,
  filterDisplayFields,
  filterAccessFields,
  displayLoadingFeedback,
  isFullRecordType
} from '../../utilities';

function RecordMedium({ record, datastoreUid }) {
  const title = record.names[0];
  const displayFields = filterDisplayFields({
    fields: record.fields,
    type: 'medium',
    datastore: datastoreUid
  });
  const access = filterAccessFields({
    fields: record.fields,
    type: 'access',
    datastore: datastoreUid,
  });
  const datastoreSlug = getDatastoreSlugByUid(datastoreUid);
  const idField = getField(record.fields, 'id');
  const isLoading = displayLoadingFeedback(datastoreUid) && record.loadingHoldings;

  if (idField) {
    const recordUid = idField.value;
    const recordFulllink = `/${datastoreSlug}/record/${recordUid}`;
    const hasFullRecord = isFullRecordType({ datastoreUid });

    return (
      <li className="record">
        <div className="record-container">
          <h3 className="record-title">
            { hasFullRecord ? (<Link className="record-title-link" to={`${recordFulllink}`}>{title}</Link>) : (<span>{title}</span>)}
          </h3>
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
