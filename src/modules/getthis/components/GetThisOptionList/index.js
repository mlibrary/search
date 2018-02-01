import React from 'react'
import { connect } from 'react-redux'

import config from '../../../../config'
import { DetailsList } from '../../../core'
import GetThisOption from '../GetThisOption'

class GetThisOptions extends React.Component {
  render() {
    const { record } = this.props

    if (record && record.getthis) {
      const { status, options } = record.getthis

      if (status === 'Success') {

        if (options.length === 0) {
          return (
            <section className="card get-this-section">
              <h2 className="get-this-section-heading">How would you like to get this item?</h2>

                <div className="alert alert-warning">
                  <p><b>Error:</b> No options available.</p>
                </div>
            </section>
          )
        }

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
      } else if (status === 'Not logged in') {
        let loginRoot = config.loginUrl.development

        if (process.env.NODE_ENV === 'production') {
          loginRoot = config.loginUrl.production;
        }

        const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

        return (
          <section className="card get-this-section">
            <h2 className="get-this-section-heading">How would you like to get this item?</h2>
            <a href={loginUrl} className="button"><b>Log in</b> to view request options</a>
          </section>
        )
      } else {
        return (
          <section className="card get-this-section">
            <h2 className="get-this-section-heading">How would you like to get this item?</h2>
            <div className="alert">
              <p>Sorry, something unexpected happened.</p>

              <p><b>Status:</b> {status}</p>
            </div>
          </section>
        )
      }
    } else {
      return (
        <section className="card get-this-section">
          <h2 className="get-this-section-heading">How would you like to get this item?</h2>
          <div className="alert">
            <p>Loading holding options...</p>
          </div>
        </section>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record
  }
}

export default connect(mapStateToProps)(GetThisOptions)
