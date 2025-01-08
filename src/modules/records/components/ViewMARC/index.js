import { getField, getFieldValue } from '../../utilities';
import React, { useState } from 'react';
import MARCTable from '../MARCTable';

const ViewMARC = ({ fields }) => {
  const [view, setView] = useState(false);
  const [marc] = getFieldValue(getField(fields, 'marc_record'));

  if (marc) {
    if (view) {
      return <MARCTable marc={marc} />;
    }

    return (
      <div className='marc-link-container'>
        <button
          className='btn btn--small btn--secondary'
          onClick={() => {
            return setView(true);
          }}
        >
          View MARC data
        </button>
      </div>
    );
  }

  return null;
};

export default ViewMARC;
