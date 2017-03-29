import React from 'react';

import ResultsSummary from '../ResultsSummary';

const Pagination = ({
  handlePreviousPage,
  handleNextPage,
}) => {
  return (
    <div className="pagination-container">
      <span>
        <button className="button-secondary" onClick={handlePreviousPage}>Previous Page</button>
          <ResultsSummary />
        <button className="button-secondary" onClick={handleNextPage}>Next Page</button>
      </span>
    </div>
  )
}

export default Pagination;
