import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from '../../../../config'

class Login extends Component {
  render() {
    const authenticated = this.props.profile && this.props.profile.status === 'Logged in'
    const href = config.loginUrl + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

    return (
      <React.Fragment>
        {this.props.render({ href, authenticated })}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(Login);
