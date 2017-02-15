import React from 'react';

function RecordField({ field }) {
  return (
    <div className="record-field">
      <dt className="record-field-name">{field.name}</dt>
      <dd className="record-field-value">{field.value}</dd>
    </div>
  );
}

RecordField.propTypes = {
  field: React.PropTypes.shape({
    key: React.PropTypes.string,
    value: React.PropTypes.string,
  }).isRequired,
};

export default RecordField;
