import React from 'react';

const ResultsSummary = ({
  showingRange,
  recordsTotal,
  recordsResultsText,
  resultsFrom,
  resultsFor,
}) => {
  return (
    <h2 className="results-summary">{showingRange} of {recordsTotal} {resultsFrom} {recordsResultsText}</h2>
  )
}

export default ResultsSummary;
