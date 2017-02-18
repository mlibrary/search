import React from 'react';

function RecordField({ field }) {

  const value = typeof(field.value) === 'string' ? field.value : 'PLACEHOLDER'

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
