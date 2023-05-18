import React from 'react';
import { MultipleChoice } from '../../../core';
import PropTypes from 'prop-types';

class DateRangeInput extends React.Component {
  constructor (props) {
    super(props);

    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleBeginQueryChange = this.handleBeginQueryChange.bind(this);
    this.handleEndQueryChange = this.handleEndQueryChange.bind(this);

    this.handleStateChange = this.handleStateChange.bind(this);

    this.renderDateInputs = this.renderDateInputs.bind(this);
    this.renderBeginQueryInput = this.renderBeginQueryInput.bind(this);
    this.renderEndQueryInput = this.renderEndQueryInput.bind(this);

    this.state = {
      dateRangeOptions: ['Before', 'After', 'Between', 'In'],
      beginQuery: this.props.beginQuery || '',
      endQuery: this.props.endQuery || '',
      selectedRangeOption: this.props.selectedRangeOption || 0
    };
  }

  handleStateChange ({ beginQuery, endQuery, selectedRange }) {
    this.props.handleSelection({
      selectedRange,
      beginDateQuery: beginQuery,
      endDateQuery: endQuery
    });
  }

  handleRangeChange ({ index }) {
    const { beginQuery, endQuery, dateRangeOptions } = this.state;
    const selectedRange = dateRangeOptions[index];

    this.setState({
      selectedRangeOption: index
    });

    this.handleStateChange({ beginQuery, endQuery, selectedRange });
  }

  handleBeginQueryChange (beginQuery) {
    const { endQuery, selectedRangeOption, dateRangeOptions } = this.state;
    const selectedRange = dateRangeOptions[selectedRangeOption];

    this.setState({
      beginQuery
    });

    this.handleStateChange({ beginQuery, endQuery, selectedRange });
  }

  handleEndQueryChange (endQuery) {
    const { beginQuery, selectedRangeOption, dateRangeOptions } = this.state;
    const selectedRange = dateRangeOptions[selectedRangeOption];

    this.setState({
      endQuery
    });

    this.handleStateChange({ beginQuery, endQuery, selectedRange });
  }

  renderBeginQueryInput () {
    const { beginQuery } = this.state;

    return (
      <div>
        <label htmlFor='date-range-start-date'>Start date</label>
        <input
          className='date-range-input-text'
          id='date-range-start-date'
          aria-describedby='date-range-start-date-description'
          type='text'
          value={beginQuery}
          onChange={(e) => {
            return this.handleBeginQueryChange(e.target.value);
          }}
          autoComplete='on'
          pattern='[0-9]{4}'
        />
        <small id='date-range-start-date-description'>Please enter this format: YYYY</small>
      </div>
    );
  }

  renderEndQueryInput () {
    const { endQuery } = this.state;

    return (
      <div>
        <label htmlFor='date-range-end-date'>End date</label>
        <input
          className='date-range-input-text'
          type='text'
          id='date-range-end-date'
          aria-describedby='date-range-end-date-description'
          value={endQuery}
          onChange={(e) => {
            return this.handleEndQueryChange(e.target.value);
          }}
          autoComplete='on'
          pattern='[0-9]{4}'
        />
        <small id='date-range-end-date-description'>Please enter this format: YYYY</small>
      </div>
    );
  }

  renderDateInputs () {
    const { dateRangeOptions, selectedRangeOption } = this.state;

    const rangeOption = dateRangeOptions[selectedRangeOption];

    switch (rangeOption) {
      case 'Before':
        return (
          <div className='date-range-container'>
            {this.renderEndQueryInput()}
          </div>
        );
      case 'In':
      case 'After':
        return (
          <div className='date-range-container'>
            {this.renderBeginQueryInput()}
          </div>
        );
      case 'Between':
        return (
          <div className='date-range-container'>
            {this.renderBeginQueryInput()}
            {this.renderEndQueryInput()}
          </div>
        );
      default:
        return null;
    }
  }

  render () {
    const { dateRangeOptions, selectedRangeOption } = this.state;

    return (
      <div className='date-range-input'>
        <MultipleChoice
          name='date-range-input'
          heading='Select the type of date range to search on'
          options={dateRangeOptions}
          selectedIndex={selectedRangeOption}
          onMultipleChoiceChange={this.handleRangeChange}
        />
        {this.renderDateInputs()}
      </div>
    );
  }
}

DateRangeInput.propTypes = {
  beginQuery: PropTypes.string,
  endQuery: PropTypes.string,
  selectedRangeOption: PropTypes.number,
  handleSelection: PropTypes.func
};

export default DateRangeInput;
