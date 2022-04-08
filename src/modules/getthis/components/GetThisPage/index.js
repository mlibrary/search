import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter,
  Link
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
import { Breadcrumb } from '../../../reusable'

class GetThisPageTemplate extends React.Component {
  render() {
    const { recordUid } = this.props

    return (
      <article className="container container-narrow">
        <div className="u-margin-top-1">
          <Breadcrumb
            items={[
              { text: 'Catalog', to: `/catalog${document.location.search}` },
              { text: 'Record', to: `/catalog/record/${recordUid}${document.location.search}` },
              { text: 'Get This' }
            ]}
            renderAnchor={(item) => (<Link to={item.to}>{item.text}</Link>)}
          />
        </div>
        <section>
          <h1 className="heading-xlarge">Get This</h1>
        </section>

        {this.props.children}
      </article>
    )
  }
}


class GetThisPage extends React.Component {
  componentDidMount() {
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
      barcode,
      recordUid
    } = this.props.match.params

    if (record && record.fields && record.fields.length === 0 && record.names.length === 0) {
      return (
        <GetThisPageTemplate>
          <div className="alert">
            <p><b>Error:</b> Unable to find this record.</p>
          </div>
        </GetThisPageTemplate>
      )
    }

    return (
      <GetThisPageTemplate recordUid={recordUid}>
        <GetThisRecord barcode={barcode} />
        <GetThisOptionList record={record} />
        <GetThisFAQ />
      </GetThisPageTemplate>
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
