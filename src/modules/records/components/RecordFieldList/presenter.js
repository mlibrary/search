import React from 'react';

import Field from '../RecordField';

function RecordFieldList({ fields, datastoreUid }) {
  if (fields.length === 0) {
    return null
  }

  return (
    <dl className="record-field-list">
      {fields.map((field, index) => (
        <Field
          field={field}
          datastoreUid={datastoreUid}
          key={index}
        />
      ))}
    </dl>
  );
}

RecordFieldList.propTypes = {
  fields: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default RecordFieldList;
