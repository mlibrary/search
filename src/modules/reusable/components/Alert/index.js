import './styles.css';
import React from 'react';

const Alert = ({ children, type = 'informational' }) => {
  return <div className={`alert alert--${type} font-small`}>{children}</div>;
};

export default Alert;
