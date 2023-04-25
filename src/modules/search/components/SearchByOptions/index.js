import React from 'react';
import { searchOptions, searchOptionsDatastores, filterOptions } from '../../utilities';
import PropTypes from 'prop-types';

const listOptions = (options) => {
  return options.map((option) => {
    // Set template for the `option` element
    return (
      <option
        value={option.uid}
        key={option.uid}
        disabled={option.disabled && option.disabled === 'disabled'}
      >
        {option.name}
      </option>
    );
  });
};

const SearchByOptions = ({ activeDatastore, fields }) => {
  let setFields = fields;
  // Override fields if custom options exist for current datastore
  if (searchOptionsDatastores().includes(activeDatastore.uid)) {
    setFields = searchOptions().filter((searchOption) => {
      return searchOption.datastore.includes(activeDatastore.uid);
    });
  }
  const searchByOptions = filterOptions(setFields);
  const browseByOptions = filterOptions(setFields, true);
  // Return only search options if browse options do not exist or in advanced search
  if (browseByOptions.length === 0 || window.location.pathname.split('/').pop() === 'advanced') {
    return listOptions(searchByOptions);
  }
  return (
    <>
      <optgroup label='Search by'>
        {listOptions(searchByOptions)}
      </optgroup>
      <optgroup label='Browse by [BETA]'>
        {listOptions(browseByOptions)}
      </optgroup>
    </>
  );
};

SearchByOptions.propTypes = {
  activeDatastore: PropTypes.object,
  fields: PropTypes.array
};

export default SearchByOptions;
