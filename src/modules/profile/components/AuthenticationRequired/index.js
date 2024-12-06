import Authentication from '../Authentication';
import PropTypes from 'prop-types';
import React from 'react';

const AuthenticationRequired = ({ children, status }) => {
  if (!children) {
    return null;
  }

  if (status === 'Logged in') {
    return children;
  }

  return (
    <Authentication button>
      <span className='strong'>Log in</span> to continue
    </Authentication>
  );
};

AuthenticationRequired.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  status: PropTypes.string
};

export default AuthenticationRequired;
