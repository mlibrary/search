/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import { MEDIA_QUERIES, SEARCH_COLORS } from '../../../reusable/umich-lib-core-temp';
import { Icon, Button } from '../../../reusable';
import { useSelector } from 'react-redux';
import qs from 'qs';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SearchByOptions from '../SearchByOptions';
import SearchTip from '../SearchTip';

function SearchBox ({ history, match, location }) {
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
  const [inputQuery, setInputQuery] = React.useState(query);
  const defaultField = fields[0].uid;
  const [field, setField] = React.useState(defaultField);

  // Set field and input when `activeDatastore`, `query`, or `fields` changes
  React.useEffect(() => {
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
    const newURL = qs.stringify({
      // Preserve existing URL's tate
      ...qs.parse(document.location.search.substring(1), { allowDots: true }),
      // If new search, return the first page
      page: undefined,
      // Add new query
      query: newQuery
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format: 'RFC1738'
    });

    const urlLocation = `/${match.params.datastoreSlug}${browseOption ? `/browse/${dropdownOption.replace('browse_by_', '')}` : ''}?${newURL}`;

    // Redirect users if browse option has been submitted
    if (browseOption) {
      window.location.href = urlLocation;
    }

    // Do not submit if query remains unchanged
    if (query === newQuery) return;

    // Submit new search
    history.push(urlLocation);
  }

  return (
    <form
      css={{
        background: SEARCH_COLORS.blue['300'],
        paddingBottom: '0.75rem',
        borderBottom: `solid 2px ${SEARCH_COLORS.blue['400']}`
      }}
      onSubmit={(e) => {
        return handleSubmitSearch(e);
      }}
    >
      <Global styles={{
        '*:focus': {
          outline: 0,
          boxShadow: 'rgb(255, 203, 5) 0px 0px 0px 2px, rgb(33, 43, 54) 0px 0px 0px 3px !important',
          zIndex: '10',
          borderRadius: '2px !important'
        }
      }}
      />
      <div
        css={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          [MEDIA_QUERIES.LARGESCREEN]: {
            padding: '0 2rem'
          }
        }}
      >
        <div css={{
          display: 'grid',
          gridTemplateAreas:
          `'dropdown dropdown'
           'input button'
           'advanced advanced'`,
          gridTemplateColumns: '1fr auto',
          gridTemplateRows: 'auto',
          [MEDIA_QUERIES.LARGESCREEN]: {
            gridTemplateAreas:
            `'dropdown input button'
             'advanced advanced advanced'`,
            gridTemplateColumns: '290px 1fr auto'
          },
          '@media only screen and (min-width: 820px)': {
            gridTemplateAreas: '\'dropdown input button advanced\'',
            gridTemplateColumns: '340px 1fr auto auto'
          }
        }}
        >
          <div
            className='search-box-dropdown'
            css={{
              gridArea: 'dropdown',
              marginTop: '0.75rem',
              position: 'relative',
              width: '100%'
            }}
          >
            <select
              aria-label='Select an option'
              className='dropdown'
              value={field}
              onChange={(e) => {
                return setOption(e);
              }}
              autoComplete='off'
              css={{
                all: 'unset',
                background: SEARCH_COLORS.grey['100'],
                border: `solid 1px ${SEARCH_COLORS.blue['500']}`,
                borderRadius: '4px',
                boxSizing: 'border-box',
                height: '100%',
                lineHeight: '1.6 !important',
                maxWidth: '100%',
                padding: '0.5rem 0.75rem',
                paddingRight: '3rem',
                width: '100%',
                [MEDIA_QUERIES.LARGESCREEN]: {
                  borderBottomRightRadius: '0',
                  borderTopRightRadius: '0'
                }
              }}
            >
              <SearchByOptions activeDatastore={activeDatastore} fields={fields} />
            </select>
            <Icon
              icon='expand_more'
              size={24}
              css={{
                position: 'absolute',
                right: '0.5rem',
                top: '0.6rem',
                pointerEvents: 'none'
              }}
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
            css={{
              all: 'unset',
              background: 'white',
              boxSizing: 'border-box',
              borderColor: `${SEARCH_COLORS.blue['500']} !important`,
              borderRadius: '4px',
              gridArea: 'input',
              lineHeight: '1.6 important!',
              marginTop: '0.75rem!important',
              maxWidth: '100%',
              width: 'auto!important',
              [MEDIA_QUERIES.LARGESCREEN]: {
                borderLeft: '0 !important',
                borderBottomLeftRadius: '0 !important',
                borderTopLeftRadius: '0 !important'
              }
            }}
          />
          <Button
            css={{
              alignItems: 'center',
              display: 'flex',
              gridArea: 'button',
              margin: '0.75rem 0 0 0.75rem',
              minWidth: '44px',
              padding: '0.5rem 0.75rem'
            }}
            type='submit'
          >
            <Icon icon='search' size={24} />
            <span css={{
              border: '0px',
              clip: 'rect(0px, 0px, 0px, 0px)',
              height: '1px',
              margin: '-1px',
              overflow: 'hidden',
              padding: '0px',
              position: 'absolute',
              width: '1px',
              whiteSpace: 'nowrap',
              overflowWrap: 'normal'
            }}
            >
              Search
            </span>
          </Button>
          {isAdvanced && (
            <Link
              to={`/${match.params.datastoreSlug}/advanced${location.search}`}
              css={{
                alignSelf: 'center',
                fontWeight: '600',
                gridArea: 'advanced',
                margin: '0.75rem 0.75rem 0 0.75rem',
                padding: '0.5rem 0',
                textAlign: 'center',
                '&:hover': {
                  textDecoration: 'underline'
                }
              }}
            >
              <span className='offpage'>{activeDatastore.name}</span>
              <span>Advanced</span>
              <span className='offpage'>Search</span>
            </Link>
          )}
        </div>
        <SearchTip activeDatastore={activeDatastore} field={field} />
      </div>
    </form>
  );
}

SearchBox.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(SearchBox);
