import React from 'react';
import PropTypes from 'prop-types';

function ActionStatusMessage (props) {
  const { status, action } = props;

  if (!status) {
    return null;
  }

  let alertType = 'warning';
  let alertMessage = "We're sorry. Something went wrong. Please use <a href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</a> for help.";

  if (status.status_code?.startsWith('action.response.')) {
    const statusCode = status.status_code;
    if (statusCode.endsWith('success')) {
      alertType = 'success';
      alertMessage = `${action.name} successfully sent.`;
    }
    if (statusCode.includes('invalid.')) {
      alertType = 'error';
      if (statusCode.endsWith('email')) {
        alertMessage = 'Please enter a valid email address (e.g. uniqname@umich.edu)';
      }
      if (statusCode.endsWith('number')) {
        alertMessage = 'Please enter a valid 10-digit phone number (e.g. 000-123-5555)';
      }
    }
  }

  return (
    <div className={'alert alert-inner alert--' + alertType}>
      <span dangerouslySetInnerHTML={{ __html: alertMessage }} />
    </div>
  );
}

ActionStatusMessage.propTypes = {
  status: PropTypes.object,
  action: PropTypes.object
};

export default ActionStatusMessage;
