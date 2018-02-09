import React from 'react';

const FullRecordPlaceholder = ({ longer }) => (
  <div className="full-record-container">
    <div className="full-record-header">
      <span className="loading-record-text">Loading record...</span>
    </div>
    <div className="record-container placeholder-container">
      <div className="placeholder placeholder-title"></div>
      <div className="placeholder placeholder-line"></div>
      <div className="placeholder placeholder-line placeholder-line-alt"></div>

      {longer && (
        <React.Fragment>
          <div className="placeholder placeholder-line"></div>
          <div className="placeholder placeholder-line placeholder-line-alt"></div>
          <div className="placeholder placeholder-line"></div>
          <div className="placeholder placeholder-line"></div>
        </React.Fragment>
      )}
    </div>
  </div>
)

export default FullRecordPlaceholder
