import React, { Component } from 'react';
import { Alert } from '../../../reusable';

class ActionStatusMessage extends Component {
  render() {
    const { status, action } = this.props

    if (!status) {
      return null
    }

    if (action.uid === 'favorite' && status.status === 'success') {
      return (
        <Alert type='success' className="u-margin-top-1">
          <p>Item(s) successfully favorited.</p>
        </Alert>
      )
    }

    switch (status.status_code) {
      case 'action.response.success':
        return (
          <Alert type='success' className="u-margin-top-1">
            <p>{action.name} successfully sent.</p>
          </Alert>
        )
      case 'action.response.invalid.email':
        return (
          <Alert type='error' className="u-margin-top-1">
            <p>Please enter a valid email address (e.g. uniqname@umich.edu)</p>
          </Alert>
        )
      case 'action.response.invalid.number':
        return (
          <Alert type='error' className="u-margin-top-1">
            <p>Please enter a valid 10-digit phone number (e.g. 000-123-5555)</p>
          </Alert>
        )
      default:
        return (
          <Alert type='warning' className="u-margin-top-1">
            <p>We're sorry. Something went wrong. Please use <a className="underline" href="https://www.lib.umich.edu/ask-librarian">Ask a Librarian</a> for help.</p>
          </Alert>
        )
    }
  }
}

export default ActionStatusMessage
