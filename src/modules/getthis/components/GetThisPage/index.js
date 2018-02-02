import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'

import {
  requestRecord,
  requestGetThis,
} from '../../../pride';
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

    if (record && record.fields.length === 0 && record.names.length === 0) {
      return (
        <article className="container container-narrow">
          <section>
            <h1 className="u-margin-bottom-none">Get This</h1>
            <p className="u-margin-top-none">Request books and other media to the campus library or department most convenient for you.</p>
          </section>

          <div className="alert">
            <p><b>Error:</b> Unable to find this record.</p>
          </div>
        </article>
      )
    }

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
