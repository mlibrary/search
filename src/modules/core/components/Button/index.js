import React from 'react';

class Button extends React.Component {
  handleButtonClick () {
    this.props.onButtonClick();
  }

  render () {
    return <button className='button' onClick={this.handleButtonClick}>{this.props.text}</button>;
  }
}

export default Button;
