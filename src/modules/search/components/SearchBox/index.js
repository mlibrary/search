/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from 'react'
import {
  COLORS,
  SPACING,
  Button,
  Icon
} from '@umich-lib/core'
import { useSelector } from "react-redux";
import qs from "qs";

function SearchBox() {
  const { query } = useSelector((state) => state.search);
  const { fields } = useSelector((state) => state.advanced[state.datastores.active]);
  const [inputQuery, setInputQuery] = React.useState(query)
  const [field, setField] = React.useState()

  function handleSubmitSearch(e) {
    e.preventDefault()

    const newQuery =  field ? `${field}:(${inputQuery})` : inputQuery

    console.log('query', query)
    console.log('newQuery', newQuery)

    if (query === newQuery) return // nothing new here

    console.log('new!')

    const newURL = qs.stringify({
      // preserve existing URL state
      ...qs.parse(document.location.search.substring(1), { allowDots: true }),
      
      // and add new query
      query: newQuery
    }, {
      arrayFormat: "repeat",
      encodeValuesOnly: true,
      allowDots: true,
      format: "RFC1738"
    })

    console.log('newURL', newURL)
  }

  return (
    <form css={{
      background: COLORS.blue['300'],
      padding: `1rem 0`,
      borderBottom: `solid 2px ${COLORS.blue['400']}`
    }} onSubmit={handleSubmitSearch}>
      <div class="container container-medium">
        <div css={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: '0.5rem'
        }}>
          <select class="dropdown" onChange={e => setField(e.target.value)}>
            {fields.map(field => <option value={field.uid}>{field.name}</option>)}
          </select>
          <input type="text" value={inputQuery} onChange={e => setInputQuery(e.target.value)}></input>
          <Button css={{
            display: 'flex',
            alignItems: 'center',
          }}><Icon icon="search" css={{
            marginRight: '0.25rem'
          }} />Search</Button>
        </div>
      </div>
    </form>
  )
}

export default SearchBox