import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore'

const UserIsNotFlintAffiliated = ({
  isFlintAffiliated,
  children
}) => {
  if (isFlintAffiliated) {
    return null
  } else {
    return children
  }
}

function mapStateToProps(state) {
  return {
    isFlintAffiliated: _.contains(state.profile.institutions, 'Flint')
  };
}

export default connect(mapStateToProps)(UserIsNotFlintAffiliated);
