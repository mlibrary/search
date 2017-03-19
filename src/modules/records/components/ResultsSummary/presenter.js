import React from 'react';

const ResultsSummary = ({
  recordsRange,
  recordsTotal,
  recordsResultsText,
  resultsFrom,
}) => {
  return (
      <span className="results-summary">{recordsRange} of <b>{recordsTotal} {recordsResultsText}</b> {resultsFrom}</span>
  )
}

export default ResultsSummary;
