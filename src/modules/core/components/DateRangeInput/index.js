import React from 'react'
import PropTypes from 'prop-types'
import { _ } from 'underscore'

import { Switch } from '../../../core'


class DateRangeInput extends React.Component {
  constructor(props) {
    super(props)

    this.handleRangeChange = this.handleRangeChange.bind(this)
    this.handleBeginQueryChange = this.handleBeginQueryChange.bind(this)
    this.handleEndQueryChange = this.handleEndQueryChange.bind(this)

    this.handleStateChange = this.handleStateChange.bind(this)

    this.renderDateInputs = this.renderDateInputs.bind(this)
    this.renderBeginQueryInput = this.renderBeginQueryInput.bind(this)
    this.renderEndQueryInput = this.renderEndQueryInput.bind(this)

    this.state = {
      dateRangeOptions: ['Before', 'After', 'Between', 'In'],
      beginQuery:  this.props.beginQuery || '',
      endQuery: this.props.endQuery || '',
      selectedRangeOption: this.props.selectedRangeOption || 0,
    }
  }

  handleStateChange({ beginQuery, endQuery, selectedRange }) {
    this.props.handleSelection({
      selectedRange,
      beginDateQuery: beginQuery,
      endDateQuery: endQuery
    })
  }

  handleRangeChange({ switchIndex }) {
    const { beginQuery, endQuery, dateRangeOptions } = this.state
    const selectedRange = dateRangeOptions[switchIndex]

    this.setState({
      selectedRangeOption: switchIndex
    })

    this.handleStateChange({ beginQuery, endQuery, selectedRange })
  }

  handleBeginQueryChange(beginQuery) {
    const { endQuery, selectedRangeOption, dateRangeOptions } = this.state
    const selectedRange = dateRangeOptions[selectedRangeOption]

    this.setState({
      beginQuery
    })

    this.handleStateChange({ beginQuery, endQuery, selectedRange })
  }

  handleEndQueryChange(endQuery) {
    const { beginQuery, selectedRangeOption, dateRangeOptions } = this.state
    const selectedRange = dateRangeOptions[selectedRangeOption]

    this.setState({
      endQuery
    })

    this.handleStateChange({ beginQuery, endQuery, selectedRange })
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
        return (
          <div className="date-range-container">
            {this.renderEndQueryInput()}
          </div>
        )
      case 'In':
      case 'After':
        return (
          <div className="date-range-container">
            {this.renderBeginQueryInput()}
          </div>
        )
      case 'Between':
        return (
          <div className="date-range-container">
            {this.renderBeginQueryInput()}
            {this.renderEndQueryInput()}
          </div>
        )
      default:
        return null
    }
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
