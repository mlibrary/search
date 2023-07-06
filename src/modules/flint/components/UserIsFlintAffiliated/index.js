import _ from 'underscore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UserIsFlintAffiliated = ({
  isFlintAffiliated,
  children
}) => {
  if (isFlintAffiliated) {
    return children;
  } else {
    return null;
  }
};

UserIsFlintAffiliated.propTypes = {
  isFlintAffiliated: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

function mapStateToProps (state) {
  return {
    isFlintAffiliated: _.contains(state.profile.institutions, 'Flint')
  };
}

export default connect(mapStateToProps)(UserIsFlintAffiliated);
