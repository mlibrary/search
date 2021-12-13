/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import React from 'react'
import {
  COLORS,
  Button,
  Icon,
  MEDIA_QUERIES
} from '@umich-lib/core'
import { useSelector } from "react-redux";
import qs from "qs";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import VisuallyHidden from "@reach/visually-hidden";
import searchOptions from "../../search-options";

function SearchBox({ history, match, location }) {
  const { query } = useSelector((state) => state.search);
  const { fields } = useSelector((state) => state.advanced[state.datastores.active]);
  const isAdvanced = useSelector((state) => state.advanced[state.datastores.active] ? true : false)
  const activeDatastore = useSelector(
    (state) => state.datastores.datastores.find(ds => ds.uid === state.datastores.active)
  )
  const [inputQuery, setInputQuery] = React.useState(query)
  const [field, setField] = React.useState(fields[0].uid)
  const isCatalog = activeDatastore.uid === 'mirlyn';

  function handleSubmitSearch(e) {
    e.preventDefault()

    let newQuery

    if (field === 'keyword') {
      newQuery = inputQuery
    } else if (field) {
      newQuery = `${field}:(${inputQuery})`
    }

    if (query === newQuery) return // no new search to make

    const newURL = qs.stringify({
      // preserve existing URL s tate
      ...qs.parse(document.location.search.substring(1), { allowDots: true }),

      // If it's a new search, then you want the first page
      // of new results, always.
      page: undefined,
      
      // and add new query
      query: newQuery
    }, {
      arrayFormat: "repeat",
      encodeValuesOnly: true,
      allowDots: true,
      format: "RFC1738"
    })

    history.push(`/${match.params.datastoreSlug}?${newURL}`)
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
          display: 'flex',
          flexWrap: 'wrap',
          [MEDIA_QUERIES.LARGESCREEN]: {
            flexWrap: 'nowrap'
          }
        }}>
          <div css={{
            flex: '1 1 auto',
            marginTop: '0.75rem',
            position: 'relative',
            width: '100%',
            [MEDIA_QUERIES.LARGESCREEN]: {
              maxWidth: '280px'
            }
          }}>
            <select
              class="dropdown"
              onChange={e => setField(e.target.value)}
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
              {isCatalog ? (
                <React.Fragment>
                  <optgroup label={`Search by`}>
                    {fields.map(field => <option value={field.uid}>{field.name}</option>)}
                  </optgroup>
                  <optgroup label={`Browse by`}>
                    <option value='browse_by_lc_callnumber'>Browse by LC call number</option>
                    <option value='browse_by_author' disabled>Browse by author (coming soon)</option>
                    <option value='browse_by_subject' disabled>Browse by subject (coming soon)</option>
                    <option value='browse_by_title' disabled>Browse by title (coming soon)</option>
                  </optgroup>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {fields.map(field => <option value={field.uid}>{field.name}</option>)}
                </React.Fragment>
              )}
            </select>
            <Icon d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" size={24} css={{
              position: 'absolute',
              right: '0.5rem',
              top: '0.6rem',
              pointerEvents: 'none'
            }} />
          </div>
          <input type="text" value={inputQuery} onChange={e => setInputQuery(e.target.value)} css={{
            all: 'unset',
            background: 'white',
            boxSizing: 'border-box',
            borderColor: `${COLORS.blue['500']} !important`,
            borderRadius: '4px',
            flex: '1 1 auto',
            lineHeight: '1.6 important!',
            marginTop: '0.75rem!important',
            maxWidth: '100%',
            width: 'auto!important',
            [MEDIA_QUERIES.LARGESCREEN]: {
              borderLeft: '0 !important',
              borderBottomLeftRadius: '0 !important',
              borderTopLeftRadius: '0 !important'
            }
          }} />
          <Button
            css={{
              display: 'flex',
              alignItems: 'center',
              margin: '0.75rem 0 0 0.75rem',
              minWidth: '44px',
              padding: '0.5rem 0.75rem'
            }}
            onClick={handleSubmitSearch}
          >
            <Icon icon="search" size={24} /><VisuallyHidden>Search</VisuallyHidden>
          </Button>
          {isAdvanced && (
            <Link
              to={`/${match.params.datastoreSlug}/advanced${location.search}`}
              className="search-box-advanced-link"
              css={{
                alignSelf: 'center',
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
        {isCatalog &&
          <SearchTip field={field} />
        }
      </div>
    </form>
  )
}

function SearchTip ({field}) {
  const selectOption = searchOptions.find((searchOption) => searchOption.value === field);
  return (
    <div
      css={{
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
          paddingTop: '4px'
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
