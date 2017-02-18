import React from 'react';

import ResultsSummary from '../ResultsSummary';

const Pagination = ({
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination-container">
      <span>
        <button className="button button-light button-small" onClick={handlePreviousPage}>Previous Page</button>
          <ResultsSummary />
        <button className="button button-light button-small" onClick={handleNextPage}>Next Page</button>
      </span>
    </div>
  )
}

export default Pagination;
