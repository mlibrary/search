import Authentication from '../Authentication';
import PropTypes from 'prop-types';
import React from 'react';

const AuthenticationRequired = ({ children, profile }) => {
  if (!children) {
    return null;
  }

  if (profile?.status === 'Logged in') {
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
  profile: PropTypes.object
};

export default AuthenticationRequired;
