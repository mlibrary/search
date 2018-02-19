import React from 'react'
import { Link } from 'react-router-dom'

const Specialist = ({ person }) => (
  <article className="specialist">
    <div>
      <img src={person.picture} className="specialist__picture" />
    </div>
    <section>
      <h1 className="specialist__heading"><Link to="/">{person.name}</Link></h1>
      <p className="specialist__job-title">{person.job_title}</p>
      <p className="specialist__phone">{person.phone}</p>
      <a className="specialist__email" href={`mailto:${person.email}`}>{person.email}</a>
    </section>
  </article>
)

export default Specialist
