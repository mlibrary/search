import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import { getSearchStateFromURL, stringifySearch } from '../../utilities';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchByOptions from '../SearchByOptions';
import SearchTip from '../SearchTip';
import { useSelector } from 'react-redux';

const SearchBox = ({ activeDatastore, query }) => {
  const navigate = useNavigate();
  const { datastoreSlug } = useParams();
  const { search } = useLocation();
  const { fields } = useSelector((state) => {
    return state.advanced[state.datastores.active];
  });
  const isAdvanced = useSelector((state) => {
    return Boolean(state.advanced[state.datastores.active]);
  });
  const [inputQuery, setInputQuery] = useState(query);
  const defaultField = fields[0].uid;
  const [currentField, setcurrentField] = useState(defaultField);

  // Set field and input when `activeDatastore`, `query`, or `fields` changes
  useEffect(() => {
    const fieldIDs = fields.map((field) => {
      return field.uid;
    });
    // Set default value of field
    let [getField] = fieldIDs;
    // Set default value of input
    let getInput = query;
    // Check if the query is a single fielded search that exists in the current datastore
    if (
      query
      && ![' AND ', ' OR ', ' NOT '].some((operator) => {
        return query.includes(operator);
      })
      && fieldIDs.some((field) => {
        return query.startsWith(`${field}:`);
      })
    ) {
      // Update field that matches query
      getField = fieldIDs.find((field) => {
        return query.startsWith(`${field}:`);
      });
      // Remove field search from query
      getInput = getInput.replace(`${getField}:`, '');
      // Remove parenthesis from query
      if (getInput.startsWith('(') && getInput.endsWith(')')) {
        getInput = getInput.slice(1, -1);
      }
    }
    // Set field value
    setcurrentField(getField);
    // Set input value
    setInputQuery(getInput);
  }, [activeDatastore, query, fields]);

  const setOption = (event) => {
    window.dataLayer.push({
      event: 'selectionMade',
      selectedElement: event.target.options[event.target.selectedIndex]
    });
    return setcurrentField(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();

    /*
     * Get the dropdown's current value because `field` does not change
     * when switching to a different datastore, and the active datastore does not have the queried option
     */
    const dropdown = document.querySelector('select.search-box-dropdown');
    const dropdownOption = dropdown.value;

    // Change `field` to current dropdown value
    dropdown.dispatchEvent(new Event('change', setcurrentField(dropdownOption)));

    // Check if browse option
    const browseOption = dropdownOption.startsWith('browse_by_');

    // Set new query
    const newQuery = (browseOption || dropdownOption === defaultField) ? inputQuery : `${dropdownOption}:(${inputQuery})`;

    // Set new URL
    const newURL = stringifySearch({
      // Preserve existing URL's tate
      ...getSearchStateFromURL(search),
      // If new search, return the first page
      page: 1,
      // Add new query
      query: newQuery
    });

    // Redirect users if browse option has been submitted
    if (browseOption) {
      let href = 'https://browse.workshop.search.lib.umich.edu';
      if (window.location.hostname === 'search.lib.umich.edu') {
        href = `/${datastoreSlug}/browse`;
      }
      if (window.location.hostname === 'localhost') {
        href = 'http://localhost:4567';
      }
      window.location.href = `${href}/${dropdownOption.replace('browse_by_', '')}?${newURL}`;
    } else {
      // Do not submit if query remains unchanged
      if (query === newQuery) {
        return;
      }
      // Submit new search
      navigate(`/${datastoreSlug}?${newURL}`);
    }
  };

  return (
    <form
      className='search-box-form'
      onSubmit={(event) => {
        return handleSubmitSearch(event);
      }}
    >
      <div className='container container-medium'>
        <select
          aria-label='Select an option'
          className='search-box-dropdown'
          value={currentField}
          onChange={(event) => {
            return setOption(event);
          }}
          autoComplete='off'
        >
          <SearchByOptions datastoreUid={activeDatastore.uid} fields={fields} />
        </select>
        <input
          type='text'
          aria-label={currentField.startsWith('browse_by_') ? 'Browse for' : 'Search for'}
          value={inputQuery}
          onChange={(event) => {
            return setInputQuery(event.target.value);
          }}
          autoComplete='on'
          name='query'
        />
        <button
          className='btn btn--primary'
          type='submit'
        >
          <Icon icon='search' size={24} />
          <span className='offpage'>
            Search
          </span>
        </button>
        {isAdvanced && (
          <Anchor
            to={`/${datastoreSlug}/advanced${search}`}
            className='strong underline__hover'
          >
            <span className='visually-hidden'>{activeDatastore.name}</span>
            <span>Advanced</span>
            <span className='visually-hidden'>Search</span>
          </Anchor>
        )}
        <SearchTip activeDatastore={activeDatastore.uid} field={currentField} />
      </div>
    </form>
  );
};

SearchBox.propTypes = {
  activeDatastore: PropTypes.object,
  query: PropTypes.string
};

export default SearchBox;
