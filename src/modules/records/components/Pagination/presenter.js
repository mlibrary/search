import React from 'react';
import { Link } from 'react-router-dom'

import ResultsSummary from '../ResultsSummary';

const Pagination = ({
  prevPageURL,
  nextPageURL,
}) => {
  return (
    <div className="pagination-container">
      <span>
        {prevPageURL && (
          <Link className="button-secondary" to={prevPageURL}>Previous Page</Link>
        )}
        <ResultsSummary />
        {nextPageURL && (
          <Link className="button-secondary" to={nextPageURL}>Next Page</Link>
        )}
      </span>
    </div>
  )
}

export default Pagination;
