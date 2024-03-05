import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { stringifySearchQueryForURL } from '../../../pride';
import './styles.css';
import { Anchor } from '../../../reusable';

const Pagination = () => {
  const history = useHistory();
  const {
    activeDatastoreUid,
    filters,
    institution,
    page,
    records,
    search,
    sort,
    total
  } = useSelector((state) => {
    return {
      activeDatastoreUid: state.datastores.active,
      filters: state.filters.active[state.datastores.active],
      institution: state.institution,
      page: state.search.data[state.datastores.active].page,
      records: state.records.records[state.datastores.active],
      search: state.search,
      sort: state.search.sort[state.datastores.active],
      total: state.search.data[state.datastores.active].totalPages
    };
  });

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (!records || records.length === 0) {
    return null;
  }

  const createSearchQuery = (newPage) => {
    const queryString = stringifySearchQueryForURL({
      filter: filters,
      library: activeDatastoreUid === 'mirlyn' ? institution.active : undefined,
      page: newPage,
      query: search.query,
      sort
    });

    return `${history.location.pathname}?${queryString}`;
  };

  const toPreviousPage = page === 1 ? undefined : createSearchQuery(page - 1);
  const toNextPage = total === 0 || page === total ? undefined : createSearchQuery(page + 1);
  const watchPageChange = (newPage) => {
    return history.push(createSearchQuery(newPage));
  };

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
    <nav className='pagination-container' aria-label='Pagination'>
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

export default Pagination;
