import React from 'react';
import PropTypes from 'prop-types';

class SiteMessage extends React.Component {
  render () {
    const { type } = this.props;

    return (
      <div className={`site-message ${type ? 'site-message-' + type : ''}`}>
        {this.props.children}
      </div>
    );
  }
}

SiteMessage.propTypes = {
  type: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default SiteMessage;
