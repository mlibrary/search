import Icon from '../../../reusable/components/Icon';
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

export default RecordFullFormats;
