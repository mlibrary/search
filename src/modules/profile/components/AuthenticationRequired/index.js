import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../../../config'


class AuthenticationRequired extends Component {
  render() {
    if (this.props.profile && this.props.profile.status === 'Logged in') {
      return this.props.children
    }

    const loginRoot = config.loginUrl;
    const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

    return (
      <a href={loginUrl} className="button u-margin-top-1"><b>Log in</b> to continue</a>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(AuthenticationRequired);
