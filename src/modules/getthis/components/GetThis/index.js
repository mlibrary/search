import React from 'react'
import { connect } from 'react-redux'

import { requestGetThis } from '../../../pride';

class GetThis extends React.Component {
  componentDidMount() {
    console.log('did mount')

    const datastoreUid = 'mirlyn'
    const recordUid = '000675299'
    const barcode = '39015041532212'

    const getThis = requestGetThis({
      datastoreUid,
      recordUid,
      barcode,
    })
  }

  render() {
    return (
      <article className="container container-narrow">
        <section>
          <h1>Get This</h1>
          <p>Request books and other media to the campus library or department most convenient for you.</p>
        </section>

        <section className="card">
          <h2>Record title</h2>

        </section>

        <section className="card">
          <h2>How would you like to get this item?</h2>

        </section>

        <section className="card">
          <h2>Frequently asked questions</h2>

        </section>
      </article>
    )
  }
}

export default GetThis;
