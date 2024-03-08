import React from 'react';
import './styles.css';
import PropTypes from 'prop-types';

function Alert ({ type = 'informational', children }) {
  return (
    <div className={`alert alert--${type} font-small`}>
      {children}
    </div>
  );
}

Alert.propTypes = {
  type: PropTypes.oneOf([
    'error',
    'informational',
    'success',
    'warning'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Alert;
