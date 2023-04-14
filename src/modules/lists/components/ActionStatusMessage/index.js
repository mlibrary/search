import React, { Component } from 'react';
import { Alert } from '../../../reusable';

class ActionStatusMessage extends Component {
  render () {
    const { status, action } = this.props;

    if (!status) {
      return null;
    }

    switch (status.status_code) {
      case 'action.response.success':
        return (
          <Alert type='success' className='u-margin-top-1'>
            <span>{action.name} successfully sent.</span>
          </Alert>
        );
      case 'action.response.invalid.email':
        return (
          <Alert type='error' className='u-margin-top-1'>
            <span>Please enter a valid email address (e.g. uniqname@umich.edu)</span>
          </Alert>
        );
      case 'action.response.invalid.number':
        return (
          <Alert type='error' className='u-margin-top-1'>
            <span>Please enter a valid 10-digit phone number (e.g. 000-123-5555)</span>
          </Alert>
        );
      default:
        return (
          <Alert type='warning' className='u-margin-top-1'>
            <span>We're sorry. Something went wrong. Please use <a className='underline' href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</a> for help.</span>
          </Alert>
        );
    }
  }
}

export default ActionStatusMessage;
