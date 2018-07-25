import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './Alert.css'
import { Button } from '../../../reusable'


class Alert extends React.Component {
  state = {
    open: true
  }

  handleClose = () => {
    this.setState({ open: false })
    this.props.onCloseButtonClick()
  }

  render() {
    const { type, className, small } = this.props

    const alertClasses = classNames(className, {
      'alert': true,
      'alert--small': small,
      'alert--success': type === 'success',
      'alert--informational': type === 'informational',
      'alert--error': type === 'error',
      'alert--warning': type === 'warning',
    });

    if (this.state.open) {
      return (
        <div className={alertClasses}>
          <div className="alert-inner container-medium">
            <p className="alert-message">{this.props.children}</p>
            <Button
              onClick={this.handleClose}
              className="alert-dismiss-button"
              kind="tertiary"
              small={small}
              >Close</Button>
          </div>
        </div>
      )
    }

    return null
  }
}

Alert.propTypes = {
  type: PropTypes.oneOf([
    'informational',
    'error',
    'warning',
    'success'
  ]),
  small: PropTypes.bool,
  onCloseButtonClick: PropTypes.func
};

Alert.defaultProps = {
  type: 'informational',
  small: false,
  onCloseButtonClick: () => {}
};

export default Alert
