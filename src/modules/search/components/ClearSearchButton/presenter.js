import React from 'react';

const ClearSearch = ({ handleClick }) => {
  return <button className='button-link underline clear-search' onClick={handleClick}>Clear search and start over</button>;
};

export default ClearSearch;
