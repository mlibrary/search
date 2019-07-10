/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import numeral from 'numeral'
import { Link as RouterLink } from 'react-router-dom'

import {
  Margins,
  SPACING,
  COLORS,
  MEDIA_QUERIES,
  Heading,
  Loading,
  Z_SPACE
} from '@umich-lib/core'

import {
  Link
} from '../../../core'

import {
  SpecialistsWrapper
} from '../../../specialists'

import {
  Filters
} from '../../../filters'

export default function Results() {
  const {
    datastores,
    search
  } = useSelector(state => state, shallowEqual)

  /*
    The user is not searching, so no need to proceed.
  */
  if (!search.searching) {
    return null
  }

  /*
    Check if the results are for a multisearch (BentoResults)
    or a typical list of results.
  */
  const datastore = datastores.datastores
    .filter(({ uid }) => datastores.active === uid)[0]

  if (datastore.isMultisearch) {
    return <BentoResults />
  }

  return (
    <Margins>
      <div css={{
        marginTop: SPACING['L'],
        display: 'flex'
      }}>
        <div
          aria-label="filters"
          css={{
            flex: '0 0 20rem',
            [MEDIA_QUERIES.LARGESCREEN]: {
              marginRight: SPACING['XL']
            }
          }}
        >
          <Filters />
        </div>
        <DatastoreResults datastore={datastore} />
      </div>
    </Margins>
  )
}

function DatastoreResults({ datastore }) {
  const { uid, name, slug } = datastore
  const { results, records, loading } = useSelector(state => state.records)

  if (loading[uid]) {
    return (
      <Loading small />
    )
  }

  /*
    Let the user know this datastore
    does not have any results to show.
  */
  const noResults = !results[uid].length
  if (noResults) {
    const hasBrowse = (uid === 'databases' || uid === 'journals') ? true : false

    return (
      <React.Fragment>
        <p>
          <b css={{ fontWeight: '700' }}>No results</b> match your search.
        </p>

        {hasBrowse && (
          <p css={{
            marginTop: SPACING['S']
          }}>Try our <Link to={`/${slug}/browse`}>Browse {name} page</Link> to view all titles alphabetically or by academic discipline.</p>
        )}
      </React.Fragment>
    )
  }

  return (
    <ul css={{
      width: '100%',
      '.result': {
        ...Z_SPACE['8'],
        background: 'white',
        borderRadius: '2px',
        padding: SPACING['L'],
        marginBottom: SPACING['M']
      }
    }}>
      {results[uid].map(result => (
        <li>
          <Result record={records[result]} />
        </li>
      ))}
    </ul>
  )
}

function BentoResults() {
  const {
    datastores
  } = useSelector(state => state.datastores, shallowEqual)
  const {
    loading
  } = useSelector(state => state.records, shallowEqual)
  const bentoDatastores = datastores.filter(({ isMultisearch }) => !isMultisearch)

  return (
    <Margins>
      <section aria-label="result groups">
        <ul
          css={{
            marginTop: SPACING["XL"],
            columnGap: SPACING["L"],
            [MEDIA_QUERIES.LARGESCREEN]: {
              columns: "2"
            },
            '@media only screen and (min-width: 960px)': {
              columns: '3'
            },
            '> li': {
              paddingBottom: SPACING["XL"],
              breakInside: 'avoid'
            }
          }}
        >
          <SpecialistsWrapper show={2}>
            {bentoDatastores.map((datastore) => (
              <li aria-label="group">
                <RouterLink
                  css={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    ':hover .bento-heading': {
                      borderBottom: `solid 1px`
                    }
                  }}
                  to={`/${datastore.slug}${document.location.search}`}
                >
                  <Heading
                    size="M"
                    level={2}
                    className="bento-heading"
                    css={{
                      marginBottom: SPACING["S"],
                      borderBottom: `solid 1px transparent`
                    }}
                  >
                    {datastore.name}
                  </Heading>

                  {loading[datastore.uid] ? (
                    <Loading small />
                  ) : (
                    <BentoboxResultsNum datastore={datastore} />
                  )}
                </RouterLink>

                <BentoGroupResults datastore={datastore} />
              </li>
            ))}
          </SpecialistsWrapper>
        </ul>
      </section>
    </Margins>
  )
}

function BentoboxResultsNum({ datastore }) {
  const { totalAvailable } = useSelector(state => state.search.data[datastore.uid])

  if (!totalAvailable) {
    return null
  }

  return (
    <span css={{
      fontWeight: '600',
      color: COLORS.neutral['300']
    }}>{numeral(totalAvailable).format(0,0)} results</span>
  )
}

function BentoGroupResults({ datastore }) {
  const { uid, slug, name } = datastore
  /*
    Check if the results are still loading.
    Do not proceed if they are.
  */
  const records = useSelector(state => state.records)
  if (records.loading[uid]) {
    return null
  }

  /*
    Let the user know this datastore
    does not have any results to show.
  */
  const noResults = !records.results[uid].length
  if (noResults) {
    const hasBrowse = (uid === 'databases' || uid === 'journals') ? true : false

    return (
      <React.Fragment>
        <p>
          <b css={{ fontWeight: '700' }}>No results</b> match your search.
        </p>

        {hasBrowse && (
          <p css={{
            marginTop: SPACING['S']
          }}>Try our <Link to={`/${slug}/browse`}>Browse {name} page</Link> to view all titles alphabetically or by academic discipline.</p>
        )}
      </React.Fragment>
    )
  }

  /*
    Handle rendering of a set of BentoResults group results.
  */
  return (
    <ul css={{
      ...Z_SPACE['8'],
      background: 'white',
      borderRadius: '2px',
      '.result': {
        border: 'none',
        padding: SPACING['M'],
        margin: '0'
      },
      '& > li:not(:last-child) .result': {
        padding: SPACING['M'],
        borderBottom: `solid 1px ${COLORS.neutral['100']}`
      }
    }}>
      {records.results[uid].slice(0, 3).map(result => (
        <li>
          <Result record={records.records[result]} />
        </li>
      ))}
    </ul>
  )
}

function Result({ record }) {
  const {
    names,
    datastore,
    fields,
    uid
  } = record;

  const to = datastore === 'website'
    ? fields.filter(field => field.uid === 'access_url')[0].value
    : `/${datastore}/record/${uid}`

  return (
    <div
      css={{
        paddingBottom: SPACING["M"],
        marginBottom: SPACING["M"]
      }}
      className="result"
      role="region"
      aria-label="result"
    >
      <Link
        to={to}
        css={{
          fontWeight: "600",
          fontSize: "1.15rem"
        }}
      >
        {names}
      </Link>

      <Metadata fields={fields} />
    </div>
  );
}

function Metadata({ fields }) {
  const data = fields.filter(({ uid }) =>
    ["brief_description", "author", "format", "type"].includes(uid)
  );

  return (
    <dl aria-label="metadata">
      {data.map(({ name, value }) => (
        <MetadataField name={name} value={value} />
      ))}
    </dl>
  );
}

function MetadataField({ name, value }) {
  function renderField(n, v) {
    return (
      <React.Fragment>
        <dt
          css={{
            fontWeight: '600',
            color: COLORS.neutral[300],
            marginTop: SPACING["XS"]
          }}
        >
          {n}
        </dt>
        {v.map(item => (
          <dd>{item.slice(0, 120)}</dd>
        ))}
      </React.Fragment>
    );
  }
  if (Array.isArray(value)) {
    return renderField(name, value.slice(0, 3));
  }

  return renderField(name, [].concat(value));
}
