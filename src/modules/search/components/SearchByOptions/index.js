import React from 'react';
import { searchOptions, searchOptionsDatastores } from '../../utilities';

const SearchByOptions = ({activeDatastore, fields}) => {
  if (searchOptionsDatastores().includes(activeDatastore.uid)) {
    const getAllSearchOptions = searchOptions().filter((searchOption) => searchOption.datastore.includes(activeDatastore.uid));
    const searchByOptions = getAllSearchOptions.filter((getSearchOption) => !getSearchOption.value.includes('browse_by'));
    const browseByOptions = getAllSearchOptions.filter((getSearchOption) => getSearchOption.value.includes('browse_by'));
    return (
      <>
        <optgroup label='Search by'>
          {searchByOptions.map(searchByOption => <option value={searchByOption.value} key={searchByOption.value} disabled={searchByOption.disabled && searchByOption.disabled === 'disabled'}>{searchByOption.label}</option>)}
        </optgroup>
        {browseByOptions.length > 0 &&
          <optgroup label='Browse by [BETA]'>
            {browseByOptions.map(browseByOption => <option value={browseByOption.value} key={browseByOption.value} disabled={browseByOption.disabled && browseByOption.disabled === 'disabled'}>{browseByOption.label}</option>)}
          </optgroup>
        }
      </>
    );
  }
  return (
    <optgroup label='Search by'>
      {fields.map(field => <option value={field.uid} key={field.uid}>{field.name}</option>)}
    </optgroup>
  );
}

export default SearchByOptions;
