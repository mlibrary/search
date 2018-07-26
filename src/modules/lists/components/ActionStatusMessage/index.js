import React, { Component } from 'react';
import { Alert } from '../../../reusable';

const StatusMessage = ({ status, message, children, handleCloseStatus}) => {
  const alertStatus = status.status_code === 'action.response.success' ? 'alert-success' : 'alert-error'

  return (
    <div className={`alert lists-action-alert ${alertStatus}`}>
      <p>{children}</p>
      <button className="button-link underline" onClick={handleCloseStatus}>Close</button>
    </div>
  )
}

class ActionStatusMessage extends Component {
  render() {
    const { status, action, handleCloseStatus } = this.props

    if (!status) {
      return null
    }

    const alertStatus = status.status_code === 'action.response.success' ? 'alert-success' : 'alert-error'

    switch (status.status_code) {
      case 'action.response.success':
        if (action.uid === 'favorite') {
          return (
            <Alert type='success' onCloseButtonClick={handleCloseStatus} className="u-margin-top-1">
              Item(s) successfully favorited.
            </Alert>
          )
        }
        return (
          <Alert type='success' onCloseButtonClick={handleCloseStatus} className="u-margin-top-1">
            {action.name} successfully sent.
          </Alert>
        )
      case 'action.response.invalid.email':
        return (
          <Alert type='error' onCloseButtonClick={handleCloseStatus} className="u-margin-top-1">
            Please enter a valid email address (e.g. uniqname@umich.edu)
          </Alert>
        )
      case 'action.response.invalid.number':
        return (
          <Alert type='error' onCloseButtonClick={handleCloseStatus} className="u-margin-top-1">
            Please enter a valid 10-digit phone number (e.g. 000-123-5555)
          </Alert>
        )
      default:
        return (
          <Alert type='warning' onCloseButtonClick={handleCloseStatus} className="u-margin-top-1">
            We're sorry. Something went wrong. Please use <a className="underline" href="https://www.lib.umich.edu/ask-librarian">Ask a Librarian</a> for help.
          </Alert>
        )
    }
  }
}

export default ActionStatusMessage
