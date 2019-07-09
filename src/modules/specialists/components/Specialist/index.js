/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'

import {
  SPACING,
  COLORS,
  Heading
} from '@umich-lib/core'

import {
  Link
} from '../../../core'

const Specialist = ({ person }) => (
  <article css={{
    display: 'flex',
    marginTop: SPACING['M'],
    marginBottom: SPACING['M'],
    paddingBottom: SPACING['M'],
    borderBottom: `solid 1px ${COLORS.neutral[100]}`
  }}>
    <div>
      <img src={person.picture} alt="" css={{
        width: '4rem',
        height: '4rem',
        borderRadius: '50%',
        objectFit: 'cover',
        objectPosition: 'top right',
        marginRight: SPACING['L']
      }} />
    </div>
    <div>
      <header>
        <Heading size="XS" level={3}>
          <Link
            to={person.url}
            data-ga-action="Click"
            data-ga-category="Library Specialist"
            data-ga-label={`Library Specialist Page - ${person.name}`}
          >{person.name}
          </Link>
        </Heading>
      </header>
      <section>
        <p css={{
          color: COLORS.neutral['300'],
          marginTop: SPACING['XS'],
          marginBottom: SPACING['XS']
        }}>{person.job_title}</p>
        <p>{person.phone}</p>
        <Link
          kind="subtle"
          to={`mailto:${person.email}`}
          data-ga-action="Click"
          data-ga-category="Library Specialist"
          data-ga-label={`Library Specialist Email - ${person.name}`}
        >{person.email}</Link>
      </section>
    </div>
  </article>
)

export default Specialist
