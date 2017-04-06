import React from 'react';

import { Icon } from '../../../core';

function RecordField({ field }) {
  const uniqueFieldClassName = 'record-field record-field-uid-' + field.uid

  if (field.uid === 'format') {
    if (Array.isArray(field.value)) {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            {field.value.map((fieldString, index) => (
              <span className="record-field-value-item" key={index}><Icon name={fieldString.toLowerCase()} />{fieldString}</span>
            ))}
          </dd>
        </div>
      )
    } else {
      return (
        <div className={uniqueFieldClassName}>
          <dt className="record-field-name">{field.name}</dt>
          <dd className="record-field-value">
            <span className="record-field-value-item"><Icon name={field.value.toLowerCase()} />{field.value}</span>
          </dd>
        </div>
      )
    }
  }

  if (Array.isArray(field.value)) {
    return (
      <div className={uniqueFieldClassName}>
        <dt className="record-field-name">{field.name}</dt>
        <dd className="record-field-value">
          {field.value.map((value, index) => (
            <span className="record-field-value-item" key={index}>{value}</span>
          ))}
        </dd>
      </div>
    )
  }

  return (
    <div className={uniqueFieldClassName}>
      <dt className="record-field-name">{field.name}</dt>
      <dd className="record-field-value">{field.value}</dd>
    </div>
  )
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
