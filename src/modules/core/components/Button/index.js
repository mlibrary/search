import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  handleButtonClick () {
    this.props.onButtonClick();
  }

  render () {
    return <button className='button' onClick={this.handleButtonClick}>{this.props.text}</button>;
  }
}

Button.propTypes = {
  onButtonClick: PropTypes.func,
  text: PropTypes.string
};

export default Button;
