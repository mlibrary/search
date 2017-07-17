import React from 'react';

const ResultsSummary = ({
  recordsRange,
  recordsTotal,
  recordsResultsText,
  resultsFrom,
  resultsFor,
}) => {
  return (
      <span className="results-summary">{recordsRange} of <b>{recordsTotal} {recordsResultsText}</b> {resultsFrom} {resultsFor}</span>
  )
}

export default ResultsSummary;
