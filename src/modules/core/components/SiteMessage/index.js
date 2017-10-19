import React from 'react';

class SiteMessage extends React.Component {
  render() {
    const { type } = this.props

    return (
      <div className={`site-message ${type ? 'site-message-' + type : '' }`}>
        {this.props.children}
      </div>
    )
  }
}

export default SiteMessage;
