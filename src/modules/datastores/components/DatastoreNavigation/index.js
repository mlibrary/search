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
import { NONAME } from 'dns';

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

export default function DatastoreNavigation() {
  const { active, datastores }  = useSelector(state => state.datastores)

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
          {datastores.map(({ uid, slug, name }) => (
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
                to={"/" + slug}
                css={createLinkStyles(uid === active)}
              >
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Margins>
    </nav>
  )
}