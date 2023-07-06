import React from 'react';
import PropTypes from 'prop-types';

const ResultsSummary = ({
  showingRange,
  recordsTotal,
  recordsResultsText,
  resultsFrom
}) => {
  return (
    <h2 className='results-summary' aria-live='polite'>{showingRange} of {recordsTotal} {resultsFrom} {recordsResultsText}</h2>
  );
};

ResultsSummary.propTypes = {
  showingRange: PropTypes.string,
  recordsTotal: PropTypes.string,
  recordsResultsText: PropTypes.string,
  resultsFrom: PropTypes.string
};

export default ResultsSummary;
