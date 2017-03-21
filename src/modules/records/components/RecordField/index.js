import React from 'react';

import { Icon } from '../../../core';

function RecordField({ field }) {
  let fieldValue = field.value

  if (field.uid === 'format') {
    if (Array.isArray(field.value)) {
      fieldValue = field.value.map((fieldString, index) => (
        <span className="record-field-value-item" key={index}><Icon name={fieldString.toLowerCase()} />{fieldString}</span>
      ))
    } else {
      fieldValue = <span className="record-field-value-item"><Icon name={field.value.toLowerCase()} />{field.value}</span>
    }
  }

  const uniqueFieldClassName = 'record-field record-field-uid-' + field.uid

  return (
    <div className={uniqueFieldClassName}>
      <dt className="record-field-name">{field.name}</dt>
      <dd className="record-field-value">{fieldValue}</dd>
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
