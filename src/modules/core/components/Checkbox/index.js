import React from 'react'
import Icon from '../Icon'

class Checkbox extends React.Component {
  render() {
    const {
      isChecked,
      handleClick,
      label,
      hideLabel
    } = this.props

    const labelTextClassName = hideLabel ? "offscreen" : "filter-name"

    return (
      <label
        role="checkbox"
        aria-checked={isChecked}
        className="checkbox-label"
        tabIndex="0"
        onClick={handleClick}
        onKeyPress={(event) => {
          if (event.charCode === 32) {
            event.preventDefault()
            handleClick()
          }
        }}>
        <div className="checkbox">
          {isChecked ? (
            <span className="filter-checkbox-checked"><Icon name='checkbox-checked' /></span>
          ) : (
            <Icon name='checkbox-unchecked' />
          )}
        </div>
        <span
          className={labelTextClassName}
        >{label}</span>
      </label>
    )
  }
}

export default Checkbox
