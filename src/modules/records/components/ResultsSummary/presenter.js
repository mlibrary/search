import React from 'react';

const ResultsSummary = ({
  recordsRange,
  recordsTotal,
  recordsResultsText
}) => {
  return (
      <span className="results-summary">{recordsRange} of <b>{recordsTotal} {recordsResultsText}</b></span>
  )
}

export default ResultsSummary;
