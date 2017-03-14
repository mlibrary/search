import React from 'react';

function RecordField({ field }) {
  let value = field.value

  if (Array.isArray(field.value)) {
    value = field.value.join(', ')
  }

  return (
    <div className="record-field">
      <dt className="record-field-name">{field.name}</dt>
      <dd className="record-field-value">{value}</dd>
    </div>
  );
}

/*
RecordField.propTypes = {
  field: React.PropTypes.shape({
    key: React.PropTypes.string,
    value: React.PropTypes.object,
  }).isRequired,
};
*/

export default RecordField;
