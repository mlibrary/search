import React from 'react';

import { Icon } from '../../../core';

function RecordField({ field }) {
  let value = field.value

  if (Array.isArray(field.value)) {
    value = field.value.join(', ')
  }

  const uniqueFieldClassName = 'record-field record-field-uid-' + field.uid

  return (
    <div className={uniqueFieldClassName}>
      <dt className="record-field-name">{field.name}</dt>
      <dd className="record-field-value"><Icon name={value.toLowerCase()} />{value}</dd>
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
