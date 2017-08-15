import React from 'react';

const ResultsSummary = ({
  pageNum,
  recordsTotal,
  recordsResultsText,
  resultsFrom,
  resultsFor,
}) => {
  return (
    <span className="results-summary">Page {pageNum} of <b>{recordsTotal} {recordsResultsText}</b> {resultsFrom} {resultsFor}</span>
  )
}

export default ResultsSummary;
