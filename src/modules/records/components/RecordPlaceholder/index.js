import React from 'react';

const RecordPlaceholder = () => {
  return (
    <li className="record">
      <div className="animated-background">
        <div className="record-container">
          <div className="record-placeholder-title"></div>
          <div className="record-placeholder-line"></div>
          <div className="record-placeholder-line"></div>
          <div className="record-placeholder-line"></div>
        </div>

        <div className="access-container">
          <div className="access-placeholder"></div>
        </div>
      </div>
    </li>
  )
}

export default RecordPlaceholder;
