import React from 'react';
import { Alert, Anchor } from '../../../reusable';
import PropTypes from 'prop-types';

function ActionStatusMessage ({ action, status }) {
  if (!status) {
    return null;
  }

  let type = 'warning';
  let message = <>We&apos;re sorry. Something went wrong. Please use <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</Anchor> for help.</>;

  if (status.status_code?.startsWith('action.response.')) {
    const statusCode = status.status_code;
    if (statusCode.endsWith('success')) {
      type = 'success';
      message = <>{action.name} successfully sent.</>;
    }
    if (statusCode.includes('invalid.')) {
      type = 'error';
      if (statusCode.endsWith('email')) {
        message = <>Please enter a valid email address (e.g. uniqname@umich.edu)</>;
      }
      if (statusCode.endsWith('number')) {
        message = <>Please enter a valid 10-digit phone number (e.g. 000-123-5555)</>;
      }
    }
  }

  return (
    <Alert type={type}>
      {message}
    </Alert>
  );
}

ActionStatusMessage.propTypes = {
  action: PropTypes.object,
  status: PropTypes.object
};

export default ActionStatusMessage;
