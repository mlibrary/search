import React from 'react';

const RecordPlaceholder = () => {
  return (
    <li className="record">
      <div className="record-container placeholder-container">
        <div className="placeholder placeholder-title"></div>
        <div className="placeholder placeholder-line"></div>
        <div className="placeholder placeholder-line placeholder-line-alt"></div>
        <div className="placeholder placeholder-line"></div>
      </div>

      <div className="access-container access-placeholder-container">
        <div className="placeholder placeholder-inline"></div>
        <div className="placeholder placeholder-access placeholder-inline"></div>
      </div>
    </li>
  )
}

export default RecordPlaceholder;
