import Authentication from '../Authentication';
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

export default AuthenticationRequired;
