import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore'

const UserIsFlintAffiliated = ({
  isFlintAffiliated,
  children
}) => {
  if (isFlintAffiliated) {
    return children
  } else {
    return null
  }
}

function mapStateToProps(state) {
  return {
    isFlintAffiliated: _.contains(state.profile.institutions, 'Flint')
  };
}

export default connect(mapStateToProps)(UserIsFlintAffiliated);
