import { getField, getFieldValue } from '../../utilities';
import React, { useState } from 'react';
import MARCTable from '../MARCTable';
import PropTypes from 'prop-types';

const ViewMARC = ({ record }) => {
  const [view, setView] = useState(false);
  const [marc] = getFieldValue(getField(record.fields, 'marc_record'));

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

ViewMARC.propTypes = {
  record: PropTypes.object.isRequired
};

export default ViewMARC;
