import React, { Component } from 'react';
import { Alert } from '../../../reusable';
import PropTypes from 'prop-types';

class ActionStatusMessage extends Component {
  render () {
    const { status, action } = this.props;

    if (!status) {
      return null;
    }

    let alertType = 'warning';
    let alertMessage = "We're sorry. Something went wrong. Please use <a className='underline' href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</a> for help.";

    if (status.status_code === 'action.response.success') {
      alertType = 'success';
      alertMessage = `${action.name} successfully sent.`;
    }

    if (status.status_code.startsWith('action.response.invalid.')) {
      alertType = 'error';
      if (status.status_code.endsWith('email')) {
        alertMessage = 'Please enter a valid email address (e.g. uniqname@umich.edu)';
      }
      if (status.status_code.endsWith('number')) {
        alertMessage = 'Please enter a valid 10-digit phone number (e.g. 000-123-5555)';
      }
    }

    return (
      <Alert type={alertType} className='u-margin-top-1'>
        <span dangerouslySetInnerHTML={{ __html: alertMessage }} />
      </Alert>
    );
  }
}

ActionStatusMessage.propTypes = {
  status: PropTypes.object,
  action: PropTypes.object
};

export default ActionStatusMessage;
