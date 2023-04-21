import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

class Alert extends React.Component {
  render () {
    const { type, closed } = this.props;

    if (!closed) {
      return (
        <div className={`alert alert--${type}`}>
          <div className='alert-inner x-spacing'>
            {this.props.children}
          </div>
        </div>
      );
    }

    return null;
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf([
    'informational',
    'error',
    'warning',
    'success'
  ]),
  closed: PropTypes.bool
};

Alert.defaultProps = {
  type: 'informational',
  closed: false
};

export default Alert;
