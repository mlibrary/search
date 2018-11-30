import React from 'react';

const RecordPlaceholder = () => {
  return (
    <div className="record">
      <div className="record-container placeholder-container" style={{ marginTop: '1rem' }}>
        <div className="placeholder placeholder-title"></div>
        <div className="placeholder placeholder-line"></div>
        <div className="placeholder placeholder-line placeholder-line-alt"></div>
        <div className="placeholder placeholder-line"></div>
      </div>
      <div className="resource-access-container">
          <div className="access-placeholder-container">
            <div className="placeholder placeholder-access placeholder-inline"></div>
            <div className="placeholder placeholder-inline"></div>
          </div>
        </div>
    </div>
  )
}

export default RecordPlaceholder;
