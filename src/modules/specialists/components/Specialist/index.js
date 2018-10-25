import React from 'react'
import { Icon } from '../../../core'

const Specialist = ({ person }) => (
  <article className="specialist">
    <div>
      <img src={person.picture} alt="" className="specialist__picture" />
    </div>
    <div>
      <header>
        <h3 className="specialist__heading">
          <a
            href={person.url}
            className="specialist__url"
            data-ga-action="Click"
            data-ga-category="Library Specialist"
            data-ga-label={`Library Specialist Page - ${person.email}`}
          >{person.name}
          </a><Icon name="launch" /></h3>
      </header>
      <section>
        <p className="specialist__job-title">{person.job_title}</p>
        <p className="specialist__phone">{person.phone}</p>
        <a
          className="specialist__email"
          href={`mailto:${person.email}`}
          data-ga-action="Click"
          data-ga-category="Library Specialist"
          data-ga-label={`Library Specialist Email - ${person.email}`}
        >{person.email}</a>
      </section>
    </div>
  </article>
)

export default Specialist
