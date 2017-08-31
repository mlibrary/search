import React from 'react'
import PropTypes from 'prop-types'
import { _ } from 'underscore'

import { Switch } from '../../../core'

const getRangeValue = ({ beginQuery, endQuery, rangeOption }) => {
  switch (rangeOption) {
    case 'Before':

      break;
    case 'After':

      break;
    case 'Between':

      break;
    case 'In':

      break;
    default:

  }
}

class DateRangeInput extends React.Component {
  constructor(props) {
    super(props)

    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleBeginQueryChange = this.handleBeginQueryChange.bind(this)
    this.handleEndQueryChange = this.handleEndQueryChange.bind(this)

    this.renderDateInputs = this.renderDateInputs.bind(this)
    this.renderBeginQueryInput = this.renderBeginQueryInput.bind(this)
    this.renderEndQueryInput = this.renderEndQueryInput.bind(this)

    this.state = {
      dateRangeOptions: ['Before', 'After', 'Between'],
      beginQuery: '',
      endQuery: '',
      selectedRangeOption: 0
    }
  }

  handleRangeChange({ switchIndex }) {
    const { dateRangeOptions, query } = this.state

    this.setState({
      selectedRangeOption: switchIndex
    })
  }

  handleBeginQueryChange(beginQuery) {
    this.setState({
      beginQuery
    })
  }

  handleEndQueryChange(endQuery) {
    this.setState({
      endQuery
    })
  }

  renderBeginQueryInput() {
    const { beginQuery } = this.state

    return (
      <input
        className="date-range-input-text"
        type="text"
        value={beginQuery}
        onChange={(e) => this.handleBeginQueryChange(e.target.value)}>
      </input>
    )
  }

  renderEndQueryInput() {
    const { endQuery } = this.state

    return (
      <input
        className="date-range-input-text"
        type="text"
        value={endQuery}
        onChange={(e) => this.handleEndQueryChange(e.target.value)}>
      </input>
    )
  }

  renderDateInputs() {
    const { beginQuery, endQuery, dateRangeOptions, selectedRangeOption } = this.state

    const rangeOption = dateRangeOptions[selectedRangeOption]

    switch (rangeOption) {
      case 'Before':
        return this.renderEndQueryInput()
      case 'After':
        return this.renderBeginQueryInput()
      case 'Between':
        return (
          <div>
            {this.renderBeginQueryInput()}
            {this.renderEndQueryInput()}
          </div>
        )
      default:
        return null
    }

    return (
      <input
        className="date-range-input-text"
        type="text"
        value={beginQuery}
        onChange={(e) => this.handleInputQueryChange({})}>
      </input>
    )
  }

  render() {
    const { dateRangeOptions, query, selectedRangeOption } = this.state

    return (
      <div className="date-range-input">
        <Switch
          options={dateRangeOptions}
          selectedIndex={selectedRangeOption}
          onSwitchChange={this.handleRangeChange}
        />
        {this.renderDateInputs()}
      </div>
    )
  }
}

export default DateRangeInput
