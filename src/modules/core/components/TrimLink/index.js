import React from 'react';
import {
  Link
} from 'react-router-dom';

class TrimLink extends React.Component {
  state = {
    show: false,
    trimlength: 240
  };

  handleShowToggleClick () {
    this.setState({
      show: !this.state.show
    });
  }

  render () {
    const {
      string,
      linkClassName,
      to
    } = this.props;

    if (string.length < this.state.trimlength) {
      return (
        <Link to={to} className={linkClassName}>
          {string}
        </Link>
      );
    }

    let displayString = null;
    if (this.state.show) {
      displayString = string;
    } else {
      displayString = `${string.substr(0, this.state.trimlength)}...`;
    }

    return (
      <span>
        <Link to={to}>
          <span className={linkClassName + ' trim-string-text'}>{displayString}</span>
        </Link>
        <button
          onClick={() => {
            return this.handleShowToggleClick();
          }}
          className='trim-string-button'
        >
          {this.state.show ? 'Show less' : 'Show more'}
        </button>
      </span>
    );
  }
}

export default TrimLink;
