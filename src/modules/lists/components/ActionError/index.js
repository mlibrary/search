import React, { Component } from 'react';
import config from '../../../../config'

const StatusMessage = ({ status, message, children, handleCloseStatus}) => {
  const alertStatus = status.status_code === 'action.response.success' ? 'alert-success' : 'alert-error'

  return (
    <div className={`alert lists-action-alert ${alertStatus}`}>
      <p>{children}</p>
      <button className="button-link underline" onClick={handleCloseStatus}>Close</button>
    </div>
  )
}

class ActionError extends Component {
  render() {
    const { status, action, handleCloseStatus } = this.props

    if (!status) {
      return null
    }

    switch (status.status_code) {
      case 'action.response.success':
        return (
          <StatusMessage status={status} handleCloseStatus={handleCloseStatus}>
            {action.name} successfuly sent.
          </StatusMessage>
        )
      case 'action.response.invalid.email':
        return (
          <StatusMessage status={status} handleCloseStatus={handleCloseStatus}>
            Please enter a valid email address (e.g. uniqname@umich.edu)
          </StatusMessage>
        )
      case 'action.response.invalid.number':
        return (
          <StatusMessage status={status} handleCloseStatus={handleCloseStatus}>
            Please enter a valid 10-digit phone number (e.g. 000-123-5555)
          </StatusMessage>
        )
      case 'action.response.authentication.required':
        const loginRoot = config.loginUrl;
        const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

        return (
          <a href={loginUrl} className="button u-margin-top-1"><b>Log in</b> to continue</a>
        )
      default:
        return (
          <StatusMessage status={status} handleCloseStatus={handleCloseStatus}>
            We're sorry. Something went wrong. Please use <a className="underline" href="https://www.lib.umich.edu/ask-librarian">Ask a Librarian</a> for help.
          </StatusMessage>
        )
    }
  }
}

export default ActionError
