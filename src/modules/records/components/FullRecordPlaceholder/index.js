import React from 'react';

const FullRecordPlaceholder = ({ longer }) => {
  return (
    <div className='container__rounded full-record-container'>
      <div className='full-record-header'>
        <span className='loading-record-text'>Loading record...</span>
      </div>
      <div className='record-container placeholder-container'>
        <div className='placeholder placeholder-title' />
        <div className='placeholder placeholder-line' />
        <div className='placeholder placeholder-line placeholder-line-alt' />

        {longer && (
          <>
            <div className='placeholder placeholder-line' />
            <div className='placeholder placeholder-line placeholder-line-alt' />
            <div className='placeholder placeholder-line' />
            <div className='placeholder placeholder-line' />
          </>
        )}
      </div>
    </div>
  );
};

export default FullRecordPlaceholder;
