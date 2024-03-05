import React, { useState, useEffect } from 'react';
import './Pagination.css';
import Anchor from '../Anchor';
import PropTypes from 'prop-types';

const Pagination = ({ page, total, watchPageChange, toPreviousPage, toNextPage, ariaLabel }) => {
  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page, toNextPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const pageNum = parseInt(currentPage, 10);
    if (Number.isInteger(pageNum) && pageNum > 0 && pageNum <= total) {
      watchPageChange(pageNum);
    }
  };

  const handleInputChange = (e) => {
    setCurrentPage(e.target.value);
  };

  const totalConverted = total?.toLocaleString();

  return (
    <nav className='pagination-container' aria-label={ariaLabel}>
      <div className='pagination-previous-container'>
        {toPreviousPage && (
          <Anchor to={toPreviousPage}>
            Previous page
          </Anchor>
        )}
      </div>
      <form className='pagination-input-container' onSubmit={handleSubmit}>
        <span>Page</span>
        <input
          className='pagination-input'
          value={currentPage}
          type='number'
          aria-label={`Page ${currentPage} of ${totalConverted} pages`}
          onBlur={() => {
            return setCurrentPage(page);
          }}
          onChange={handleInputChange}
        />
        <span>of&nbsp;{totalConverted}</span>
      </form>
      <div className='pagination-next-container'>
        {toNextPage && (
          <Anchor to={toNextPage}>
            Next page
          </Anchor>
        )}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  total: PropTypes.number,
  watchPageChange: PropTypes.func,
  toPreviousPage: PropTypes.string,
  toNextPage: PropTypes.string,
  ariaLabel: PropTypes.string
};

export default Pagination;
