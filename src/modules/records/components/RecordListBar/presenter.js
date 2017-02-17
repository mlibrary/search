import React from 'react';

const RecordListBar = ({
  handlePreviousPage,
  handleNextPage,
  recordsRange,
  recordsTotal,
  recordsResultsText
}) => {
  return (
    <div className="records-list-bar">
      <span>
        <button className="button-link" onClick={handlePreviousPage}>Previous Page</button>
          <span className="records-summary">{recordsRange} of <b>{recordsTotal} {recordsResultsText}</b></span>
        <button className="button-link" onClick={handleNextPage}>Next Page</button>
      </span>
    </div>
  )
}

export default RecordListBar;
