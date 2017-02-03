import React from 'react';

import Field from '../RecordField';

function RecordFieldList({ fields }) {
  return (
    <dl>
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
