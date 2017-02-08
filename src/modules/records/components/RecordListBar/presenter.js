import React from 'react';

const RecordListBar = ({ handlePreviousPage, handleNextPage, recordsSummary }) => {
  return (
    <div className="records-list-bar">
      <span>
        <button className="button-link underline" onClick={handlePreviousPage}>Previous Page</button>
          <span className="records-summary">{recordsSummary}</span>
        <button className="button-link underline" onClick={handleNextPage}>Next Page</button>
      </span>
    </div>
  )
}

export default RecordListBar;
