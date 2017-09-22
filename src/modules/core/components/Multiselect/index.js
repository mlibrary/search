import React from 'react';
import PropTypes from 'prop-types';
import { _ } from 'underscore'

import { Checkbox } from '../../../core'

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

  componentWillReceiveProps(nextProps) {
    const { showOnlySelectedOptions } = this.state

    // Reset show only selected toggle when unchecking the last checked option
    if (showOnlySelectedOptions) {
      const selectedOptions = _.filter(nextProps.options, (option => option.checked))

      if (selectedOptions.length === 0) {
        this.setState({
          showOnlySelectedOptions: false
        })
      }
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
      showOnlySelectedOptions: !this.state.showOnlySelectedOptions
    })
  }

  isOptionFiltered(option) {
    const { filterQuery } = this.state

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

            if (!showOnlySelectedOptions || (showOnlySelectedOptions && option.checked)) {
              return (
                <MultiselectOption
                  handleClick={() => this.handleOptionSelection(option, index)}
                  option={option}
                  key={index} />
              )
            }

            return null
          })}
        </fieldset>
        {selectedOptions.length > 0 ? (
          <button
            type="button"
            className="button-link-light multiselect-show-checked-toggle" onClick={this.handleShowOnlySelectedOptionsClick}>
            {showOnlySelectedOptions ? (
              <span>Show all options</span>
            ) : (
              <span>{`Show only selected options (${selectedOptions.length})`}</span>
            )}
          </button>
        ) : null}
      </div>
    )
  }
}

const MultiselectOption = ({ option, handleClick }) => {
  return (
    <Checkbox
      isChecked={option.checked}
      label={option.name}
      handleClick={handleClick}
    />
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
