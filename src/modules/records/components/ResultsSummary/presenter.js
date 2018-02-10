import React from 'react';

const ResultsSummary = ({
  showingRange,
  recordsTotal,
  recordsResultsText,
  resultsFrom,
  resultsFor,
}) => {
  return (
    <span className="results-summary">Showing {showingRange} of {recordsTotal} results from {resultsFrom}</span>
  )
}

export default ResultsSummary;
