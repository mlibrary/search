import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../Login';

function AuthenticationRequired (props) {
  if (!props.children) {
    return null;
  }

  if (props.profile?.status === 'Logged in') {
    return props.children;
  }

  return (
    <Login text='Log in to continue' />
  );
}

AuthenticationRequired.propTypes = {
  profile: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

function mapStateToProps (state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(AuthenticationRequired);
