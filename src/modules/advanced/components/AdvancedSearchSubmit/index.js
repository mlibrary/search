import { Icon } from '../../../reusable';
import React from 'react';

const AdvancedSearchSubmit = () => {
  return (
    <button
      className='btn btn--primary margin-top__m'
      type='submit'
    >
      <Icon icon='search' size={24} /> Advanced Search
    </button>
  );
};

export default AdvancedSearchSubmit;
