import React from 'react';

import Field from '../RecordField';

function RecordFieldList({ fields }) {

  console.log('fields', fields)

  if (fields.length === 0) {
    return (
      <p>No filters found for your search</p>
    )
  }

  return (
    <dl className="record-field-list">
      {fields.map((field, index) => (
        <Field
          field={field}
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
