import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'

import {
  requestRecord,
  requestGetThis
} from '../../../pride';
import { DetailsList } from '../../../core'

import GetThisOption from '../GetThisOption'


class GetThisOptions extends React.Component {
  render() {
    const { record } = this.props

    if (record && record.getthis) {
      const { status, options } = record.getthis

      if (status === 'Success') {
        return (
          <section className="card get-this-section">
            <h2 className="get-this-section-heading">How would you like to get this item?</h2>

            <DetailsList className="get-this-options">
              {options.map((option, key) => (
                <GetThisOption option={option} key={key} />
              ))}
            </DetailsList>
          </section>
        )
      } else {
        return (
          <p>
            Loaded, but not successful. Might need to login.
          </p>
        )
      }
    } else {
      return null // loading
    }
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record
  }
}

export default connect(mapStateToProps)(GetThisOptions)
