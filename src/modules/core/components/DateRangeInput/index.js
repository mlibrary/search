import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const YearInput = ({ point = 'start', query, setQuery }) => {
  return (
    <div>
      <label htmlFor={`date-range-${point}-date`}>{point.charAt(0).toUpperCase() + point.slice(1)} date</label>
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
};

YearInput.propTypes = {
  point: PropTypes.string,
  query: PropTypes.string,
  setQuery: PropTypes.func
};

const dateRangeOptions = ['Before', 'After', 'Between', 'In'];

const DateRangeInput = ({ beginQuery, endQuery, selectedRangeOption, handleSelection }) => {
  const [beginQueryState, setBeginQuery] = useState(beginQuery || '');
  const [endQueryState, setEndQuery] = useState(endQuery || '');
  const [selectedRangeOptionState, setSelectedRangeOption] = useState(selectedRangeOption || 0);

  const handleStateChange = (beginQueryVal, endQueryVal, selectedRange) => {
    handleSelection({
      beginDateQuery: beginQueryVal,
      endDateQuery: endQueryVal,
      selectedRange
    });
  };

  useEffect(() => {
    const selectedRange = dateRangeOptions[selectedRangeOptionState];
    handleStateChange(beginQueryState, endQueryState, selectedRange);
  }, [beginQueryState, endQueryState, selectedRangeOptionState]);

  const handleBeginQueryChange = (query) => {
    setBeginQuery(query);
  };

  const handleEndQueryChange = (query) => {
    setEndQuery(query);
  };

  const rangeOption = dateRangeOptions[selectedRangeOptionState];

  return (
    <div className='date-range-input'>
      <fieldset className='flex__responsive'>
        <legend className='visually-hidden'>Select the type of date range to search on</legend>
        {dateRangeOptions.map((option, index) => {
          return (
            <label key={index}>
              <input
                type='radio'
                name='date-range-input'
                value={option}
                checked={selectedRangeOptionState === index}
                onChange={() => {
                  return setSelectedRangeOption(index);
                }}
              />
              {option}
            </label>
          );
        })}
      </fieldset>
      <div className='date-range-container'>
        {
          rangeOption !== 'Before' && (
            <YearInput
              query={beginQueryState}
              setQuery={(event) => {
                return handleBeginQueryChange(event.target.value);
              }}
            />
          )
}
        {
          ['Before', 'Between'].includes(rangeOption) && (
            <YearInput
              query={endQueryState}
              setQuery={(event) => {
                return handleEndQueryChange(event.target.value);
              }}
              point='end'
            />
          )
}
      </div>
    </div>
  );
};

DateRangeInput.propTypes = {
  beginQuery: PropTypes.string,
  endQuery: PropTypes.string,
  handleSelection: PropTypes.func,
  selectedRangeOption: PropTypes.number
};

export default DateRangeInput;
