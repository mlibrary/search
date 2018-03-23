import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  LiveMessage
} from 'react-aria-live';

class A11yLiveMessage extends Component {
  render() {
    return (
      <LiveMessage message={this.props.a11yMessage} aria-live="assertive" />
    )
  }
}

function mapStateToProps(state) {
  return {
    a11yMessage: state.a11y.message,
  };
}

export default connect(mapStateToProps)(A11yLiveMessage)
