import React from 'react'
import { connect } from 'react-redux'
import {
  withRouter
} from 'react-router-dom'
import {
  Heading,
  Text,
  Breadcrumb,
  BreadcrumbItem
} from '@umich-lib/core'

import { Link } from '../../../core'

import {
  requestRecord,
  requestGetThis,
} from '../../../pride';
import {
  GetThisOptionList,
  GetThisFAQ,
  GetThisRecord,
} from '../../../getthis'

class GetThisPageTemplate extends React.Component {
  render() {
    const { recordUid } = this.props

    return (
      <article className="container container-narrow">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={`/catalog${document.location.search}`}>
              Catalog
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to={`/catalog/record/${recordUid}${document.location.search}`}>
              Record
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Get This</BreadcrumbItem>
        </Breadcrumb>
        <section>
          <Heading size="3XL" level={1}>Get This</Heading>
          <Text lede>Request books and other media to the campus library or department most convenient for you.</Text>
        </section>

        {this.props.children}
      </article>
    )
  }
}


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
