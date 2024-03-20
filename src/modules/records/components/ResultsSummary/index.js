import React from 'react';
import { useSelector } from 'react-redux';

const ResultsSummary = () => {
  const activeDatastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const datastores = useSelector((state) => {
    return state.datastores.datastores;
  });
  const search = useSelector((state) => {
    return state.search.data[activeDatastoreUid];
  });
  const { page, totalAvailable, totalPages } = search || {};
  const resultsPerPage = 10;
  const startRange = page ? (page * resultsPerPage - 9).toLocaleString() : '0';
  const displayTotalAvailable = totalAvailable?.toLocaleString();
  const endRange = totalAvailable <= resultsPerPage || page === totalPages
    ? displayTotalAvailable
    : (Math.min(page * resultsPerPage, totalAvailable)).toLocaleString();
  const datastore = datastores.find((ds) => {
    return ds.uid === activeDatastoreUid;
  });

  return (
    <h2 className='results-summary' aria-live='polite'>
      {startRange} to {endRange} of {displayTotalAvailable} {datastore?.name || ''} result{totalAvailable !== 1 ? 's' : ''}
    </h2>
  );
};

export default ResultsSummary;
