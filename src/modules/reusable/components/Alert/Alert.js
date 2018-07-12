import React from 'react';
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
    const { type } = this.props

    if (this.state.open) {
      return (
        <div className={`alert alert-${type}`}>
          <div className="alert-inner">
            <p className="alert-message">{this.props.children}</p>
            <Button
              onClick={this.handleClose}
              className="alert-dismiss-button"
              kind="tertiary"
              small={true}
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
    'warning'
  ]),
  onCloseButtonClick: PropTypes.func
};

Alert.defaultProps = {
  type: 'informational',
  onCloseButtonClick: () => {}
};

export default Alert
