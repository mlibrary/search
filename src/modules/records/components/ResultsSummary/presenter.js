import React from 'react';

const ResultsSummary = ({
  showingRange,
  recordsTotal,
  recordsResultsText,
  resultsFor,
}) => {
  return (
    <span className="results-summary">{showingRange} of {recordsTotal} {recordsResultsText}</span>
  )
}

export default ResultsSummary;
