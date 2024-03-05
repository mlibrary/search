import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { stringifySearchQueryForURL } from '../../../pride';
import PaginationPresenter from './presenter';

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

  const createSearchQuery = (page) => {
    const queryString = stringifySearchQueryForURL({
      filter: filters,
      library: activeDatastoreUid === 'mirlyn' ? institution.active : undefined,
      page,
      query: search.query,
      sort
    });

    return `${history.location.pathname}?${queryString}`;
  };

  const toPreviousPage = () => {
    return page === 1 ? undefined : createSearchQuery(page - 1);
  };

  const toNextPage = () => {
    return total === 0 || page === total ? undefined : createSearchQuery(page + 1);
  };

  const watchPageChange = (newPage) => {
    history.push(createSearchQuery(newPage));
  };

  if (!records || records.length === 0) {
    return null;
  }

  return (
    <PaginationPresenter
      ariaLabel='Pagination'
      page={page}
      total={total}
      watchPageChange={watchPageChange}
      toNextPage={toNextPage()}
      toPreviousPage={toPreviousPage()}
    />
  );
};

export default Pagination;
