import React from 'react';

const RecordPreviewPlaceholder = () => {
  return (
    <li className='record-preview record-preview-placeholder'>
      <div className='placeholder placeholder-title' />
      <div className='placeholder placeholder-line placeholder-line-alt' />
      <div className='placeholder placeholder-line record-placeholder-last' />
    </li>
  );
};

export default RecordPreviewPlaceholder;
