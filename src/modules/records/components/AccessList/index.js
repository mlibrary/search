import React from 'react'

class AccessList extends React.Component {
  render() {
    return (
      <ul className="access-list">
        {this.props.children}
      </ul>
    )
  }
}

const AccessItem = ({ link, linkText, status, type }) => (
  <li className="access-item">
    <a href={link} className={type === 'full' ? 'button' : 'underline'}>{linkText}</a> {status}
  </li>
)

const SkeletonAccessItem = () => (
  <li className="access-item">
    <div className="placeholder placeholder-access placeholder-inline"></div>
    <div className="placeholder placeholder-inline"></div>
  </li>
)

export {
  AccessList,
  AccessItem
}
