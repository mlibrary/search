import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../../../config';
import PropTypes from 'prop-types';

class Login extends Component {
  render () {
    const authenticated = this.props.profile && this.props.profile.status === 'Logged in';
    const href = config.loginUrl + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search);
    const loading = this.props.loading;

    return (
      <>
        {this.props.render({ href, authenticated, loading })}
      </>
    );
  }
}

Login.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
  render: PropTypes.func
};

function mapStateToProps (state) {
  return {
    profile: state.profile,
    loading: !state.profile.status
  };
}

export default connect(mapStateToProps)(Login);
