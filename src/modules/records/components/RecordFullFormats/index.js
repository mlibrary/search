import Icon from '../../../reusable/components/Icon';
import PropTypes from 'prop-types';
import React from 'react';

const RecordFullFormats = ({ formats }) => {
  return (
    <div className='full-record-header'>

      {(formats || []).map((format, index) => {
        return (
          <span className='full-record-format' key={index}>
            {format.icon && (
              <Icon
                icon={format.icon}
                className='margin-right__2xs'
              />
            )}
            {format.text}
          </span>
        );
      })}
    </div>
  );
};

RecordFullFormats.propTypes = {
  formats: PropTypes.array
};

export default RecordFullFormats;
