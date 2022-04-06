/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import React from 'react'
import {
  COLORS,
  Button,
  MEDIA_QUERIES
} from '@umich-lib/core';
import Icon from "../../../reusable/components/Icon";
import { useSelector } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import searchOptions from "../../search-options";

function SearchBox({ history, match, location }) {
  const { query } = useSelector((state) => state.search);
  const { fields } = useSelector((state) => state.advanced[state.datastores.active]);
  const isAdvanced = useSelector((state) => state.advanced[state.datastores.active] ? true : false)
  const activeDatastore = useSelector(
    (state) => state.datastores.datastores.find(ds => ds.uid === state.datastores.active)
  )
  const [inputQuery, setInputQuery] = React.useState(query)
  const defaultField = fields[0].uid;
  const [field, setField] = React.useState(defaultField)
  const isCatalog = activeDatastore.uid === 'mirlyn';
  const isArticles = activeDatastore.uid === 'primo';

  function setOption(e) {
    window.dataLayer.push({
      event: 'selectionMade',
      selectedElement: e.target.options[e.target.selectedIndex]
    });
    return setField(e.target.value);
  }

  function handleSubmitSearch(e) {
    e.preventDefault();

    // Get the dropdown's current value because `field` does not change
    // when switching to a different datastore, and the active datastore does not have the queried option
    const dropdown = document.querySelector('.search-box-dropdown > select.dropdown');
    const dropdownOption = dropdown.value;

    // Change `field` to current dropdown value
    dropdown.dispatchEvent(new Event('change', setField(dropdownOption)));

    // Check if browse option
    const browseOption = dropdownOption.startsWith('browse_by_');
    const browseURL = browseOption ? `/browse/${dropdownOption.slice(10)}` : '';

    // Set new query
    const newQuery = (browseOption || dropdownOption === defaultField) ? inputQuery : `${dropdownOption}:(${inputQuery})`;

    // Check if new search
    if (query === newQuery) return;

    // Set new URL
    const newURL = qs.stringify({
      // Preserve existing URL's tate
      ...qs.parse(document.location.search.substring(1), { allowDots: true }),
      // If new search, return the first page
      page: undefined,
      // Add new query
      query: newQuery
    }, {
      arrayFormat: "repeat",
      encodeValuesOnly: true,
      allowDots: true,
      format: "RFC1738"
    });

    // Redirect users if browse option has been submitted
    if (browseOption) {
      window.location.href = `/${match.params.datastoreSlug}${browseURL}?${newURL}`;
    } else {
      history.push(`/${match.params.datastoreSlug}?${newURL}`);
    }
  }

  return (
    <form css={{
      background: COLORS.blue['300'],
      paddingBottom: `0.75rem`,
      borderBottom: `solid 2px ${COLORS.blue['400']}`
    }} onSubmit={handleSubmitSearch}>
      <Global styles={{
        '*:focus': {
          outline: 0,
          boxShadow: `rgb(255, 203, 5) 0px 0px 0px 2px, rgb(33, 43, 54) 0px 0px 0px 3px !important`,
          zIndex: '10',
          borderRadius: '2px !important'
        }
      }}/>
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
            gridTemplateColumns: '290px 1fr auto',
          },
          '@media only screen and (min-width: 820px)': {
            gridTemplateAreas: `'dropdown input button advanced'`,
            gridTemplateColumns: '340px 1fr auto auto',
          }
        }}>
          <div 
            className="search-box-dropdown" 
            css={{
              gridArea: 'dropdown',
              marginTop: '0.75rem',
              position: 'relative',
              width: '100%',
            }}
          >
            <select
              aria-label="Select an option"
              className="dropdown"
              value={field}
              onChange={e => setOption(e)}
              autoComplete="off"
              css={{
                all: 'unset',
                background: COLORS.grey['100'],
                border: `solid 1px ${COLORS.blue['500']}`,
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
              <React.Fragment>
                <optgroup label={`Search by`}>
                  {fields.map(field => <option value={field.uid} key={field.uid}>{field.name}</option>)}
                </optgroup>
                {isCatalog && (
                  <optgroup label={`Browse by [BETA]`}>
                    <option value='browse_by_callnumber' key='browse_by_callnumber'>Browse by call number (LC and Dewey)</option>
                    <option value='browse_by_author' key='browse_by_author' disabled>Browse by author (coming soon)</option>
                    <option value='browse_by_subject' key='browse_by_subject' disabled>Browse by subject (coming soon)</option>
                    <option value='browse_by_title' key='browse_by_title' disabled>Browse by title (coming soon)</option>
                  </optgroup>
                )}
              </React.Fragment>
            </select>
            <Icon
              icon="expand_more"
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
            type="text"
            aria-label={field.startsWith('browse_by_') ? `Browse for` : `Search for`}
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            autoComplete="on"
            css={{
              all: 'unset',
              background: 'white',
              boxSizing: 'border-box',
              borderColor: `${COLORS.blue['500']} !important`,
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
            onClick={handleSubmitSearch}
          >
            <Icon icon="search" size={24} />
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
            }}>Search</span>
          </Button>
          {isAdvanced && (
            <Link
              to={`/${match.params.datastoreSlug}/advanced${location.search}`}
              className="search-box-advanced-link"
              css={{
                alignSelf: 'center',
                gridArea: 'advanced',
                margin: '0.75rem 0.75rem 0 0.75rem',
                padding: '0.5rem 0',
                textAlign: 'center'
              }}
            >
              <span className="offpage">{activeDatastore.name}</span>
              <span>Advanced</span>
              <span className="offpage">Search</span>
            </Link>
          )}
        </div>
        {(isCatalog || isArticles) &&
          <SearchTip field={field} />
        }
      </div>
    </form>
  )
}

function SearchTip ({field}) {
  const selectOption = searchOptions.find((searchOption) => searchOption.value === field);
  // Check if option and tip exist
  if (selectOption === undefined || selectOption.tip === undefined) return (null);
  return (
    <div
      css={{
        alignItems: 'flex-start',
        display: 'flex',
        gap: '12px',
        marginTop: '0.75rem',
        width: '100%'
      }}
    >
      <Icon
        d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"
        css={{
          flexShrink: '0',
          paddingTop: '4px',
          height: 'auto'
        }}
      />
      <p
        css={{
          margin: '0'
        }}
      >
        <span css={{fontWeight: 'bold'}}>{field.includes('browse_by') ? 'Browse' : 'Search'} Tip: </span>
        <span dangerouslySetInnerHTML={{__html: selectOption.tip}} />
      </p>
    </div>
  );
}

export default withRouter(SearchBox)
