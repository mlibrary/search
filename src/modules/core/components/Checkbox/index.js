import React from 'react'
import Icon from '../Icon'

class Checkbox extends React.Component {
  handleKeyDown(event, isChecked) {
    const enterCode = 13
    const spaceCode = 32
    const eventCode = event.code

    if (eventCode === '' || eventCode === spaceCode) {
      this.props.handleClick(isChecked)
    }
  }

  render() {
    const { isChecked, handleClick, label } = this.props

    return (
      <label
        role="checkbox"
        aria-checked={isChecked}
        className="checkbox-label"
        tabIndex="0"
        onChange={() => handleClick(!isChecked)}>
        <div className="checkbox">
          {isChecked ? (
            <span className="filter-checkbox-checked"><Icon name='checkbox-checked' /></span>
          ) : (
            <Icon name='checkbox-unchecked' />
          )}
        </div>
        <span className="filter-name">{label}</span>
      </label>
    )
  }
}

export default Checkbox
