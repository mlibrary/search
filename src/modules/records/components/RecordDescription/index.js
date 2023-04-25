import React from 'react';
import { getField, getFieldValue } from '../../utilities';
import PropTypes from 'prop-types';

function createMarkup (markupString) {
  return { __html: markupString };
}

const RecordDescription = ({ record }) => {
  const abstract = getField(record.fields, 'abstract');
  const desc = getField(record.fields, 'description');
  const descField = abstract || desc;
  const description = getFieldValue(descField)[0];

  if (!description) {
    return null;
  }

  return (
    <p
      className='full-record__description'
      dangerouslySetInnerHTML={createMarkup(description)}
    />
  );
};

RecordDescription.propTypes = {
  record: PropTypes.object
};

export default RecordDescription;
