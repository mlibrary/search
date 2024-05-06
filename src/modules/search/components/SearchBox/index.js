import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import { Anchor, Icon } from '../../../reusable';
import SearchByOptions from '../SearchByOptions';
import SearchTip from '../SearchTip';
import { getSearchStateFromURL, stringifySearch } from '../../utilities';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function SearchBox () {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { query } = useSelector((state) => {
    return state.search;
  });
  const { fields } = useSelector((state) => {
    return state.advanced[state.datastores.active];
  });
  const isAdvanced = useSelector((state) => {
    return !!state.advanced[state.datastores.active];
  });
  const activeDatastore = useSelector(
    (state) => {
      return state.datastores.datastores.find((ds) => {
        return ds.uid === state.datastores.active;
      });
    }
  );
  const [inputQuery, setInputQuery] = useState(query);
  const defaultField = fields[0].uid;
  const [field, setField] = useState(defaultField);

  // Set field and input when `activeDatastore`, `query`, or `fields` changes
  useEffect(() => {
    const fieldIDs = fields.map((field) => {
      return field.uid;
    });
    // Set default value of field
    let getField = fieldIDs[0];
    // Set default value of input
    let getInput = query;
    // Check if the query is a single fielded search that exists in the current datastore
    if (
      query &&
      ![' AND ', ' OR ', ' NOT '].some((operator) => {
        return query.includes(operator);
      }) &&
      fieldIDs.some((field) => {
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
    setField(getField);
    // Set input value
    setInputQuery(getInput);
  }, [activeDatastore, query, fields]);

  function setOption (e) {
    window.dataLayer.push({
      event: 'selectionMade',
      selectedElement: e.target.options[e.target.selectedIndex]
    });
    return setField(e.target.value);
  }

  function handleSubmitSearch (e) {
    e.preventDefault();

    // Get the dropdown's current value because `field` does not change
    // when switching to a different datastore, and the active datastore does not have the queried option
    const dropdown = document.querySelector('.search-box-dropdown > select.dropdown');
    const dropdownOption = dropdown.value;

    // Change `field` to current dropdown value
    dropdown.dispatchEvent(new Event('change', setField(dropdownOption)));

    // Check if browse option
    const browseOption = dropdownOption.startsWith('browse_by_');

    // Set new query
    const newQuery = (browseOption || dropdownOption === defaultField) ? inputQuery : `${dropdownOption}:(${inputQuery})`;

    // Set new URL
    const newURL = stringifySearch({
      // Preserve existing URL's tate
      ...getSearchStateFromURL(location.search),
      // If new search, return the first page
      page: undefined,
      // Add new query
      query: newQuery
    });

    // Redirect users if browse option has been submitted
    if (browseOption) {
      let href = 'https://browse.workshop.search.lib.umich.edu';
      if (window.location.hostname === 'search.lib.umich.edu') {
        href = `/${params.datastoreSlug}/browse`;
      }
      if (window.location.hostname === 'localhost') {
        href = 'http://localhost:4567';
      }
      window.location.href = `${href}/${dropdownOption.replace('browse_by_', '')}?${newURL}`;
    } else {
      // Do not submit if query remains unchanged
      if (query === newQuery) return;
      // Submit new search
      navigate(`/${params.datastoreSlug}?${newURL}`);
    }
  }

  return (
    <form
      className='search-box-form'
      onSubmit={(e) => {
        return handleSubmitSearch(e);
      }}
    >
      <div className='container container-medium'>
        <div className='search-box-dropdown'>
          <select
            aria-label='Select an option'
            className='dropdown'
            value={field}
            onChange={(e) => {
              return setOption(e);
            }}
            autoComplete='off'
          >
            <SearchByOptions activeDatastore={activeDatastore} fields={fields} />
          </select>
          <Icon
            icon='expand_more'
            size={24}
          />
        </div>
        <input
          type='text'
          aria-label={field.startsWith('browse_by_') ? 'Browse for' : 'Search for'}
          value={inputQuery}
          onChange={(e) => {
            return setInputQuery(e.target.value);
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
            to={`/${params.datastoreSlug}/advanced${location.search}`}
            className='strong underline__hover'
          >
            <span className='visually-hidden'>{activeDatastore.name}</span>
            <span>Advanced</span>
            <span className='visually-hidden'>Search</span>
          </Anchor>
        )}
        <SearchTip activeDatastore={activeDatastore.uid} field={field} />
      </div>
    </form>
  );
}

export default SearchBox;
