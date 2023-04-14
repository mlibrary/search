import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setA11yMessage
} from '../../../a11y';

class A11yLiveMessage extends Component {
  state = {
    currentA11yMessage: ''
  };

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.a11yMessage) {
      // Delay the message slightly to allow for the transition.
      setTimeout(() => {
        this.setState({
          currentA11yMessage: nextProps.a11yMessage
        });
      }, 50);
      // Clear the message.
      setTimeout(() => {
        this.setState({ currentA11yMessage: '' });
      }, 500);
    }
  }

  componentDidUpdate () {
    const { setA11yMessage } = this.props;

    // Also clear the redux message value.
    setTimeout(() => {
      setA11yMessage('');
    }, 500);
  }

  render () {
    const { currentA11yMessage } = this.state;
    return (
      <div role='status' aria-atomic='true' aria-live='polite' className='offpage'>
        {currentA11yMessage ? <span>{currentA11yMessage}</span> : ''}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    a11yMessage: state.a11y.message
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setA11yMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(A11yLiveMessage);
