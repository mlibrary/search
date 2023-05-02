import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function A11yLiveMessage (props) {
  const [currentA11yMessage, setcurrentA11yMessage] = useState('');

  useEffect(() => {
    setcurrentA11yMessage(props.a11yMessage);
  }, [props.a11yMessage, currentA11yMessage]);

  return (
    <div role='status' aria-atomic='true' aria-live='polite' className='offpage'>
      <span>{currentA11yMessage}</span>
    </div>
  );
}

A11yLiveMessage.propTypes = {
  a11yMessage: PropTypes.string
};

export default connect(
  (state) => {
    return {
      a11yMessage: state.a11y.message
    };
  }
)(A11yLiveMessage);
