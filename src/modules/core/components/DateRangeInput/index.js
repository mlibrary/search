import React from 'react';
import { MultipleChoice } from '../../../core';
import PropTypes from 'prop-types';

function YearInput ({ query, setQuery, point = 'start' }) {
  return (
    <div>
      <label htmlFor='date-range-start-date'>{point.charAt(0).toUpperCase() + point.slice(1)} date</label>
      <input
        className='date-range-input-text'
        id={`date-range-${point}-date`}
        aria-describedby={`date-range-${point}-date-description`}
        type='text'
        value={query}
        onChange={setQuery}
        autoComplete='on'
        pattern='[0-9]{4}'
      />
      <small id={`date-range-${point}-date-description`}>Please enter this format: YYYY</small>
    </div>
  );
}

YearInput.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
  point: PropTypes.string
};

class DateRangeInput extends React.Component {
  constructor (props) {
    super(props);

    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleBeginQueryChange = this.handleBeginQueryChange.bind(this);
    this.handleEndQueryChange = this.handleEndQueryChange.bind(this);

    this.handleStateChange = this.handleStateChange.bind(this);

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

  render () {
    const { dateRangeOptions, selectedRangeOption, beginQuery, endQuery } = this.state;

    const rangeOption = dateRangeOptions[selectedRangeOption];

    return (
      <div className='date-range-input'>
        <MultipleChoice
          name='date-range-input'
          heading='Select the type of date range to search on'
          options={dateRangeOptions}
          selectedIndex={selectedRangeOption}
          onMultipleChoiceChange={this.handleRangeChange}
        />
        <div className='date-range-container'>
          {
            rangeOption !== 'Before' &&
              <YearInput
                query={beginQuery}
                setQuery={(e) => {
                  return this.handleBeginQueryChange(e.target.value);
                }}
              />
          }
          {
            ['Before', 'Between'].includes(rangeOption) &&
              <YearInput
                query={endQuery}
                setQuery={(e) => {
                  return this.handleEndQueryChange(e.target.value);
                }}
                point='end'
              />
          }
        </div>
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
