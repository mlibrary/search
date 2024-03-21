import React from 'react';
import PropTypes from 'prop-types';
import Authentication from '../Authentication';

function AuthenticationRequired ({ profile, children }) {
  if (!children) return null;

  if (profile?.status === 'Logged in') return children;

  return (
    <Authentication button>
      <span className='strong'>Log in</span> to continue
    </Authentication>
  );
}

AuthenticationRequired.propTypes = {
  profile: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthenticationRequired;
