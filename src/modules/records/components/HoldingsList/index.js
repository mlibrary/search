import React from 'react'

class HoldingsList extends React.Component {
  render() {
    return (
      <ul className="access-list">
        {this.props.children}
      </ul>
    )
  }
}

const HoldingItem = ({ link, linkText, status, type }) => (
  <li className="access-item">
    <a href={link} className={type === 'full' ? 'button' : 'underline'}>{linkText}</a> {status}
  </li>
)

const SkeletonHoldingItem = () => (
  <li className="access-item">
    <div className="placeholder placeholder-access placeholder-inline"></div>
    <div className="placeholder placeholder-inline"></div>
  </li>
)

export {
  HoldingsList,
  HoldingItem
}
