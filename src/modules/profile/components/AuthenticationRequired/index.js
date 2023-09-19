import React from 'react';
import PropTypes from 'prop-types';
import Authentication from '../Authentication';

function AuthenticationRequired (props) {
  if (!props.children) {
    return null;
  }

  if (props.profile?.status === 'Logged in') {
    return props.children;
  }

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
