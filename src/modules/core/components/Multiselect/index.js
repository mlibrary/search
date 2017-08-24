import React from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore'

const isOptionChecked = ({ option, index, tempSelections }) => {
  if (option.checked) {
    return true
  }
  const isTempChecked = _.contains(tempSelections, index)
  return isTempChecked
}

class Multiselect extends React.Component {
  constructor(props) {
    super(props)
    this.handleOptionSelect = this.handleOptionSelect.bind(this)
    this.handleFilterQueryChange = this.handleFilterQueryChange.bind(this)
    this.isOptionFiltered = this.isOptionFiltered.bind(this)

    this.state = {
      tempSelections: [],
      filterQuery: ''
    }
  }

  handleOptionSelect(option, index) {
    const isTempChecked = _.contains(this.state.tempSelections, index)

    // Add
    if (!isTempChecked) {
      const tempSelections = this.state.tempSelections.concat(index)
      this.setState({ tempSelections })

    // Remove
    } else {
      const tempSelections = _.filter(this.state.tempSelections, (tempIndex => tempIndex !== index))
      this.setState({ tempSelections })
    }
  }

  handleFilterQueryChange(value) {
    this.setState({
      filterQuery: value
    })
  }

  isOptionFiltered(option) {
    const { filterQuery } = this.state

    console.log('filterQuery', filterQuery)
    console.log('this.state', this.state)

    if (filterQuery.length === 0) {
      return false
    }

    return option.name.includes(filterQuery)
  }

  render() {
    const { options } = this.props
    const { filterQuery } = this.state

    if (!options || options.length === 0) {
      return null
    }

    return (
      <div className="multiselect">
        <input
          type="text"
          className="multiselect-search"
          aria-label="Filter options"
          placeholder="Filter"
          value={filterQuery}
          onChange={(event) => this.handleFilterQueryChange(event.target.value)}
        >
        </input>
        <fieldset className="multiselect-options">
          {options.map((option, index) => {
            if (this.isOptionFiltered(option)) {
              return null
            }

            return (
              <MultiselectOption
                handleClick={() => this.handleOptionSelect(option, index)}
                option={option}
                isChecked={isOptionChecked({
                  option,
                  index,
                  tempSelections: this.state.tempSelections
                })}
                key={index} />
            )
          })}
        </fieldset>
        {this.state.tempSelections.length > 0 ? (
          <button className="button-light multiselect-apply">Apply</button>
        ) : null}
      </div>
    )
  }
}

const MultiselectOption = ({ option, isChecked, handleClick }) => {
  return (
    <label className="multiselect-option">
      <input
        type="checkbox"
        checked={isChecked}
        value={option.value}
        onClick={handleClick}
        aria-label={option.name}
      >
      </input>
      <span className="multiselect-option-label-text">{option.name}</span>
    </label>
  )
}

Multiselect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    value: PropTypes.string,
    name: PropTypes.string
  }))
}

export default Multiselect;
