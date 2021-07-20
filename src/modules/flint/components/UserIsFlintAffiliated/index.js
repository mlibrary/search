import _ from 'underscore'
import { connect } from 'react-redux';

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
