import React from 'react';
import { Link } from 'react-router-dom'

const Pagination = ({
  prevPageURL,
  nextPageURL,
  scrollToTop
}) => {

  if (!prevPageURL && !nextPageURL) {
    return null
  }

  return (
    <div className="pagination-container">
      <span>
        {prevPageURL && (
          <Link className="button-secondary" onClick={() => scrollToTop()} to={prevPageURL}>Previous Page</Link>
        )}
        {nextPageURL && (
          <Link className="button-secondary" onClick={() => scrollToTop()} to={nextPageURL}>Next Page</Link>
        )}
      </span>
    </div>
  )
}

export default Pagination;
