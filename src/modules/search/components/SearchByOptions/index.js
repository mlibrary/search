import { filterOptions, searchOptions, searchOptionsDatastores } from '../../utilities';
import PropTypes from 'prop-types';
import React from 'react';

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

const SearchByOptions = ({ datastoreUid, fields }) => {
  let setFields = fields;
  // Override fields if custom options exist for current datastore
  if (searchOptionsDatastores().includes(datastoreUid)) {
    setFields = searchOptions().filter((searchOption) => {
      return searchOption.datastore.includes(datastoreUid);
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
      <optgroup label='Browse by'>
        {listOptions(browseByOptions)}
      </optgroup>
    </>
  );
};

SearchByOptions.propTypes = {
  datastoreUid: PropTypes.string,
  fields: PropTypes.array
};

export default SearchByOptions;
