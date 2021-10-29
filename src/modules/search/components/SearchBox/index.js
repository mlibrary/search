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

function SearchBox({ history, match, location }) {
  const { query } = useSelector((state) => state.search);
  const { fields } = useSelector((state) => state.advanced[state.datastores.active]);
  const isAdvanced = useSelector((state) => state.advanced[state.datastores.active] ? true : false)
  const activeDatastore = useSelector(
    (state) => state.datastores.datastores.find(ds => ds.uid === state.datastores.active)
  )
  const [inputQuery, setInputQuery] = React.useState(query)
  const [field, setField] = React.useState(fields[0].uid)

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
      padding: `1rem 0`,
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
          gridTemplateColumns: 'auto 1fr auto auto'
        }}>
          <div css={{
            position: 'relative'
          }}>
            <select
              class="dropdown"
              onChange={e => setField(e.target.value)}
              css={{
                appearance: 'unset',
                fontFamily: 'inherit',
                fontSize: '1rem',
                padding: '0 0.75rem',
                border: `solid 1px ${COLORS.blue['500']}`,
                background: COLORS.grey['100'],
                height: '100%',
                borderRadius: '4px 0 0 4px',
                borderRight: 'none',
                paddingRight: '3rem',
                margin: 0,
                minWidth: 'auto',
                [MEDIA_QUERIES.LARGESCREEN]: {
                  minWidth: '15rem',
                }
              }}
            >
              {fields.map(field => <option value={field.uid}>{field.name}</option>)}
            </select>
              <Icon d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" size={24} css={{
                position: 'absolute',
                right: '0.5rem',
                top: '0.6rem',
                pointerEvents: 'none'
              }} />
          </div>
          <input type="text" value={inputQuery} onChange={e => setInputQuery(e.target.value)} css={{
            border: `solid 1px ${COLORS.blue['500']} !important`,
            borderRadius: '0 4px 4px 0 !important'
          }} />
          <Button
            css={{
              display: 'flex',
              alignItems: 'center',
              margin: 0,
              marginLeft: '0.5rem',
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
              gridRow: '2',
              padding: '0.5rem',
              marginBottom: '-1rem',
              gridColumn: '1/-1',
              textAlign: 'center',
              [MEDIA_QUERIES.LARGESCREEN]: {
                gridRow: 'auto',
                gridColumn: 'auto',
                margin: '0',
                paddingLeft: '1rem'
              }
            }}
          >
            <span className="offpage">{activeDatastore.name}</span>
            <span>Advanced</span>
            <span className="offpage">Search</span>
          </Link>
        )}
        </div>
      </div>
    </form>
  )
}

export default withRouter(SearchBox)