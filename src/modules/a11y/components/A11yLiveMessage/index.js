import React, { Component } from 'react';
import { connect } from 'react-redux'

class A11yLiveMessage extends Component {
  state = {
    currentA11yMessage: ''
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.a11yMessage) {
      // Delay the message slightly to allow for the transition.
      setTimeout(() => {this.setState({
        currentA11yMessage: nextProps.a11yMessage
      })}, 50);
      // Clear the message.
      setTimeout(() => {this.setState({
        currentA11yMessage: ''
      })}, 500)
    }
  }

  render() {
    const { currentA11yMessage } = this.state
    return (
      <div role="status" aria-atomic="true" aria-live="polite" className="">
        {currentA11yMessage ? <span>{currentA11yMessage}</span> : ''}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    a11yMessage: state.a11y.message,
  };
}

export default connect(mapStateToProps)(A11yLiveMessage)
