import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  withRouter
} from 'react-router-dom'

import {
  requestRecord,
  requestGetThis,
  requestGetThisHolding,
} from '../../../pride';
import {
  DetailsList
} from '../../../core'
import {
  GetThisOptionList,
  GetThisFAQ,
  GetThisRecord,
} from '../../../getthis'


class GetThisPage extends React.Component {
  componentWillMount() {
    const {
      recordUid,
      barcode
    } = this.props.match.params
    const {
      datastoreUid
    } = this.props

    requestRecord({
      recordUid,
      datastoreUid
    })
    requestGetThis({
      datastoreUid,
      recordUid,
      barcode,
    })
  }

  render() {
    const {
      record
    } = this.props
    const {
      barcode
    } = this.props.match.params

    return (
      <article className="container container-narrow">
        <section>
          <h1 className="u-margin-bottom-none">Get This</h1>
          <p className="u-margin-top-none">Request books and other media to the campus library or department most convenient for you.</p>
        </section>

        <GetThisRecord barcode={barcode} />
        <GetThisOptionList record={record} />
        <GetThisFAQ />
      </article>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active
  }
}

export default withRouter(connect(mapStateToProps)(GetThisPage))
