import React from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore'

class Multiselect extends React.Component {
  constructor(props) {
    super(props)
    this.handleOptionSelection = this.handleOptionSelection.bind(this)
    this.handleFilterQueryChange = this.handleFilterQueryChange.bind(this)
    this.isOptionFiltered = this.isOptionFiltered.bind(this)
    this.handleShowOnlySelectedOptionsClick = this.handleShowOnlySelectedOptionsClick.bind(this)

    this.state = {
      filterQuery: '',
      showOnlySelectedOptions: false,
    }
  }

  handleOptionSelection(option, index) {
    this.props.handleSelection(index, option)
  }

  handleFilterQueryChange(value) {
    this.setState({
      filterQuery: value
    })
  }

  handleShowOnlySelectedOptionsClick() {
    this.setState({
      showOnlySelectedOptions: !this.sate.showOnlySelectedOptions
    })
  }

  isOptionFiltered(option) {
    const { filterQuery, showOnlySelectedOptions } = this.state

    if (filterQuery.length === 0) {
      return false
    }

    return !option.name.toLowerCase().includes(filterQuery.toLowerCase())
  }

  render() {
    const { options } = this.props
    const { filterQuery, showOnlySelectedOptions } = this.state

    if (!options || options.length === 0) {
      return null
    }

    const selectedOptions = _.filter(options, (option => option.checked))

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
                handleClick={() => this.handleOptionSelection(option, index)}
                option={option}
                key={index} />
            )
          })}
        </fieldset>
        {selectedOptions.length > 0 ? (
          <button
            className="button-link-light multiselect-apply" onClick={this.handleShowOnlySelectedOptionsClick}>
            {showOnlySelectedOptions ? (
              <span>Show all options</span>
            ) : (
              <span>Show only selected options</span>
            )}
          </button>
        ) : null}
      </div>
    )
  }
}

const MultiselectOption = ({ option, handleClick }) => {
  return (
    <label className="multiselect-option">
      <input
        type="checkbox"
        checked={option.checked}
        value={option.value}
        onClick={handleClick}
      ></input>
      <span className="multiselect-option-label-text">{option.name}</span>
    </label>
  )
}

Multiselect.propTypes = {
  handleSelection: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    value: PropTypes.string,
    name: PropTypes.string
  }))
}

export default Multiselect;
