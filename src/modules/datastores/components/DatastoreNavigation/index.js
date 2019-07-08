/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Margins,
  SPACING,
  MEDIA_QUERIES,
  TYPOGRAPHY,
  COLORS
} from '@umich-lib/core'
import {
  stringifySearchQueryForURL
} from '../../../pride'

/*
import DatastoreNavigation from './container';

export default DatastoreNavigation;
*/

function createLinkStyles(active) {
  function createActiveStyles() {
    if (active) {
      return {
        borderLeft: `solid 3px ${COLORS.teal['400']}`,
        paddingLeft: SPACING['M'],
        fontWeight: '600',
        [MEDIA_QUERIES.LARGESCREEN]: {
          paddingLeft: '0',
          borderLeft: 'none',
          borderBottom: `solid 3px ${COLORS.teal['400']}`
        }
      }
    }

    return {}
  }

  return {
    ...TYPOGRAPHY['XS'],
    display: 'block',
    paddingTop: SPACING['M'],
    paddingBottom: `calc(${SPACING['M']} - 3px)`,
    ...createActiveStyles()
  }
}

function DatastoreNavigationItem({ uid }) {
  const {
    datastores,
    search,
    filters,
    institution
  }  = useSelector(state => state)
  const { name, slug } = datastores.datastores.filter(ds => ds.uid === uid)[0]
  const active = datastores.active
  const queryString = stringifySearchQueryForURL({
    query: search.query,
    filter: filters.active[uid],
    page: search.page[uid] === 1 ? undefined : search.page[uid],
    sort: search.sort[uid],
    library: uid === 'mirlyn' ? institution.active : undefined
  })
  const query = queryString.length ? '?' + queryString : ''
  const to = "/" + slug + query

  return (
    <li
      key={uid}
      css={{
        [MEDIA_QUERIES.LARGESCREEN]: {
          display: 'inline-block',
          ':not(:first-of-type)': {
            marginLeft: SPACING['L']
          }
        }
      }}
    >
      <Link
        to={to}
        css={createLinkStyles(uid === active)}
      >
        <span>{name}</span>
      </Link>
    </li>
  )
}

export default function DatastoreNavigation() {
  const { datastores }  = useSelector(state => state.datastores)

  return (
    <nav aria-label="search groupings" css={{
      background: 'white'
    }}>
      <Margins> 
        <ul css={{
          paddingTop: SPACING['M'],
          [MEDIA_QUERIES.LARGESCREEN]: {
            paddingTop: '0',
            textAlign: 'center'
          }
        }}>
          {datastores.map(({ uid }) => (
            <DatastoreNavigationItem uid={uid} key={uid} />
          ))}
        </ul>
      </Margins>
    </nav>
  )
}