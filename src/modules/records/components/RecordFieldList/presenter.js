import React from 'react';

import Field from '../RecordField';

function RecordFieldList({ fields, datastoreUid, institution }) {
  if (fields.length === 0) {
    return null
  }
  
  return (
    <dl className="record-field-list">
      {fields.map((field, index) => (
        <Field
          field={field}
          datastoreUid={datastoreUid}
          institution={institution}
          key={index}
        />
      ))}
    </dl>
  );
}

export default RecordFieldList;
