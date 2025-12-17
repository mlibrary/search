import './styles.css';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Anchor } from '../../../reusable';
import { stringifySearch } from '../../../search';
import { useSelector } from 'react-redux';

const Pagination = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeDatastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const institution = useSelector((state) => {
    return state.institution.active;
  });
  const filter = useSelector((state) => {
    return state.filters.active[activeDatastoreUid];
  });
  const { data, query, sort } = useSelector((state) => {
    return state.search;
  });
  const { page, totalPages } = data[activeDatastoreUid];
  const records = useSelector((state) => {
    return state.records.records[activeDatastoreUid];
  });

  const [currentPage, setCurrentPage] = useState(page);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  if (!records || records.length === 0) {
    return null;
  }

  const createSearchQuery = (newPage) => {
    const queryString = stringifySearch({
      filter,
      library: activeDatastoreUid === 'mirlyn' ? institution : null,
      page: newPage,
      query,
      sort: sort[activeDatastoreUid]
    });

    return `${location.pathname}?${queryString}`;
  };

  const toPreviousPage = page === 1 ? null : createSearchQuery(page - 1);
  const toNextPage = totalPages === 0 || page === totalPages ? null : createSearchQuery(page + 1);
  const watchPageChange = (newPage) => {
    return navigate(createSearchQuery(newPage));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const pageNum = parseInt(currentPage, 10);
    if (Number.isInteger(pageNum) && pageNum > 0 && pageNum <= totalPages) {
      watchPageChange(pageNum);
    }
  };

  const handleInputChange = (event) => {
    setCurrentPage(event.target.value);
  };

  const totalConverted = totalPages?.toLocaleString();

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
          min='1'
          max={totalPages}
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
