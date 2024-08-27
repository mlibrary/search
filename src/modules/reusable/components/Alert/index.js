import './styles.css';
import PropTypes from 'prop-types';
import React from 'react';

const Alert = ({ children, type = 'informational' }) => {
  return <div className={`alert alert--${type} font-small`}>{children}</div>;
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  type: PropTypes.oneOf([
    'error',
    'informational',
    'success',
    'warning'
  ])
};

export default Alert;
