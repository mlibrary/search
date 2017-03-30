import React from 'react'
import _ from 'underscore'

class AccessList extends React.Component {
  state = {
    show: false
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const length = this.props.length || 0
    const hasShowHideButton = length > 1

    return (
      <div className="access-list-container">
        <ul className={`access-list show-all-able-list ${this.state.show ? 'show-all' : ''}`}>
          {this.props.children}
        </ul>
        {hasShowHideButton && (
          <ShowHideButton
            show={this.state.show}
            length={length}
            handleOnClick={this.handleShowToggleClick.bind(this)}
          />
        )}
      </div>
    )
  }
}

const AccessItem = ({ type, item }) => {
  const isFull = (type === 'full')

  return (
    <li className={`access-item ${isFull ? 'access-item-full' : ''}`}>
      {_.map(item, (field, index) => {
        if (field.isLink) {
          return (
            <a href={field.value} key={index} className={`access-detail access-link ${isFull ? 'button' : 'underline'}`}>{field.label}</a>
          )
        }

        return (
          <span key={index} className="access-detail">{field.value}</span>
        )
      })}
    </li>
  )
}

const SkeletonHoldingItem = () => (
  <li className="access-item">
    <div className="placeholder placeholder-access placeholder-inline"></div>
    <div className="placeholder placeholder-inline"></div>
  </li>
)

const ShowHideButton = ({ handleOnClick, show, length}) => {
  return (
    <button
      onClick={() => handleOnClick()}
      className="button-secondary button-small show-all-button">
      {show ? 'Fewer' : `${length - 1} More`}
    </button>
  )
}

export {
  AccessList,
  AccessItem,
  SkeletonHoldingItem
}
