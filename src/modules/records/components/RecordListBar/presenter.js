import React from 'react';

const RecordListBar = ({ onClearSearch }) => {
  return (
    <div className="alert results-action-container">
      <button className="button-link underline" onClick={onClearSearch}>Clear Search</button>
      <span>1,000,000 results</span>
      <span>
        <button className="button-link underline" onClick={onClearSearch}>Previous</button>
          <span className="pagination-summary">1-10</span>
        <button className="button-link underline" onClick={onClearSearch}>Next</button>
      </span>
    </div>
  )
}

export default RecordListBar;
