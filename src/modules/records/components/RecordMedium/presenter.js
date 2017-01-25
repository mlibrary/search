import React from 'react';

import FieldList from '../RecordFieldList';

function RecordMedium({ name, fields }) {
  return (
    <li className="record">
      <h3 className="record-title">{name}</h3>
      <FieldList fields={fields} />
    </li>
  );
}

RecordMedium.propTypes = {
  name: React.PropTypes.string.isRequired,
  fields: React.PropTypes.array.isRequired,
};

export default RecordMedium;
