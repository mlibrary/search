/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import {
  Margins,
  SPACING,
  COLORS,
  MEDIA_QUERIES,
  Heading,
  Loading
} from '@umich-lib/core'

import {
  Link
} from '../../../core'

import {
  SpecialistsWrapper
} from '../../../specialists'

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
    Check if the results are for a multisearch (bentobox)
    or a typical list of results.
  */
  const { isMultisearch } = datastores.datastores
    .filter(({ uid }) => datastores.active === uid)[0]

  if (isMultisearch) {
    return <Bentobox />
  }

  return (
    <Margins>
      <p>results</p>
    </Margins>
  )
}

function Bentobox() {
  const {
    datastores
  } = useSelector(state => state.datastores, shallowEqual)
  const bentoDatastores = datastores.filter(({ isMultisearch }) => !isMultisearch)

  return (
    <Margins>
      <section aria-label="result groups">
        <ul
          css={{
            marginTop: SPACING["XL"],
            [MEDIA_QUERIES.LARGESCREEN]: {
              columns: "3",
              columnGap: SPACING["XL"]
            },
            '> li': {
              marginBottom: SPACING["XL"],
              breakInside: 'avoid'
            }
          }}
        >
          <SpecialistsWrapper show={2}>
            {bentoDatastores.map((datastore) => (
              <li aria-label="group">
                <Heading
                  size="L"
                  level={2}
                  css={{
                    marginBottom: SPACING["M"]
                  }}
                >
                  {datastore.name}
                </Heading>

                <BentoGroupResults datastore={datastore} />
              </li>
            ))}
          </SpecialistsWrapper>
        </ul>
      </section>
    </Margins>
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
    return (
      <Loading small />
    )
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
    Handle rendering of a set of bentobox group results.
  */
  return (
    <ul>
      {records.results[uid].slice(0, 4).map(result => (
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
    : `https://search.lib.umich.edu/${datastore}/record/${uid}`

  return (
    <div
      css={{
        borderBottom: `solid 1px ${COLORS.neutral[100]}`,
        paddingBottom: SPACING["M"],
        marginBottom: SPACING["M"]
      }}
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
