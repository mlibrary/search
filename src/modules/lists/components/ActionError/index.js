import React, { Component } from 'react';
import config from '../../../../config'

class ActionError extends Component {
  render() {
    const { status } = this.props

    if (!status) {
      return null
    }

    if (status === 'Not logged in') {
      const loginRoot = config.loginUrl;
      const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

      return (
        <a href={loginUrl} className="button u-margin-top-1"><b>Log in</b> to continue</a>
      )
    } else {
      const alertStatus = status === 'Success' ? 'alert-success' : 'alert-warning'

      return (
        <div className={`alert lists-action-alert ${alertStatus}`}>
          <p><b>Status:</b> {status}</p>
          <button className="button-link underline" onClick={this.props.handleCloseStatus}>Close</button>
        </div>
      )
    }
  }
}

export default ActionError
