import React from 'react';
import PropTypes from 'prop-types';

const ClearSearch = ({ triggerClick }) => {
  return <button className='button-link underline clear-search' onClick={triggerClick}>Clear search and start over</button>;
};

ClearSearch.propTypes = {
  triggerClick: PropTypes.func
};

export default ClearSearch;
