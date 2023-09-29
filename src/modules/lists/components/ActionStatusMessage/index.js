import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';

function ActionStatusMessage (props) {
  if (!props.status) {
    return null;
  }

  const alertType = (type) => {
    if (props.status.status_code?.startsWith('action.response.')) {
      const statusCode = props.status.status_code;
      if (statusCode.endsWith('success')) {
        return type ? 'success' : <>{props.action.name} successfully sent.</>;
      }
      if (statusCode.includes('invalid.')) {
        if (type) return 'error';
        if (statusCode.endsWith('email')) {
          return <>Please enter a valid email address (e.g. uniqname@umich.edu)</>;
        }
        if (statusCode.endsWith('number')) {
          return <>Please enter a valid 10-digit phone number (e.g. 000-123-5555)</>;
        }
      }
    }

    return type ? 'warning' : <>We're sorry. Something went wrong. Please use <Anchor href='https://www.lib.umich.edu/ask-librarian'>Ask a Librarian</Anchor> for help.</>;
  };

  return (
    <div className={'alert alert-inner alert--' + alertType(true)}>
      <span>{alertType()}</span>
    </div>
  );
}

ActionStatusMessage.propTypes = {
  status: PropTypes.object,
  action: PropTypes.object
};

export default ActionStatusMessage;
