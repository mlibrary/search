import React from 'react';

import Field from '../RecordField';

function RecordFieldList({ fields }) {
  return (
    <dl>
      {fields.map(field => (
        <Field
          field={field}
        />
      ))}
    </dl>
  );
}

RecordFieldList.propTypes = {
  fields: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default RecordFieldList;
