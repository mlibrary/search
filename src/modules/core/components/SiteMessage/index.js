import React from 'react';

class SiteMessage extends React.Component {
  render() {
    const { type } = this.props

    return (
      <div className={`alert site-alert ${type ? 'site-' + type : '' }`}>
        {this.props.children}
      </div>
    )
  }
}

export default SiteMessage;
