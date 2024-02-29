import React from 'react';
import PropTypes from 'prop-types';

function Alert ({ type = 'informational', children }) {
  return (
    <div className={`alert alert--${type}`}>
      <div className='alert-inner font-small x-spacing'>
        {children}
      </div>
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf([
    'informational',
    'error',
    'warning',
    'success'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Alert;
