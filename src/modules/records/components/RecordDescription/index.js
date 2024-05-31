import { getField, getFieldValue } from '../../utilities';
import PropTypes from 'prop-types';
import React from 'react';

const RecordDescription = ({ record }) => {
  const descField = getField(record.fields, 'abstract') || getField(record.fields, 'description');
  const [description] = getFieldValue(descField);

  if (!description) {
    return null;
  }

  return <p className='full-record__description' dangerouslySetInnerHTML={{ __html: description }} />;
};

RecordDescription.propTypes = {
  record: PropTypes.object
};

export default RecordDescription;
