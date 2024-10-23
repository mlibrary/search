import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const dateRangeOptions = ['before', 'after', 'between', 'in'];

const extractYears = (dateString) => {
  return dateString.match(/\d+/gu) || [''];
};

const extractRange = (dateString) => {
  const years = extractYears(dateString);
  if (!years[0]) {
    return dateRangeOptions[0];
  }
  if (years.length > 1) {
    return 'between';
  }
  return dateString.replace(/[\d\s]+/gu, '') || 'in';
};

const DateRangeInput = ({ currentFilter = '', datastoreUid, filterGroupUid }) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(extractRange(currentFilter));
  const [years, setYears] = useState(extractYears(currentFilter));

  const updateFilter = useCallback((filterValue) => {
    dispatch(setAdvancedFilter({
      datastoreUid,
      filterGroupUid,
      filterValue,
      onlyOneFilterValue: true
    }));
  }, [dispatch, datastoreUid, filterGroupUid]);

  useEffect(() => {
    updateFilter(currentFilter);
  }, [currentFilter, updateFilter]);

  useEffect(() => {
    if (years[0]) {
      let filterValue = range === 'between' ? years.join(' to ') : `${range} ${years[0]}`;
      if (range === 'in') {
        [filterValue] = years;
      }
      updateFilter(filterValue);
    }
  }, [range, years, updateFilter]);

  const handleYearChange = (index, value) => {
    const newYears = [...years];
    newYears[index] = value;
    setYears(range === 'between' ? newYears : [newYears[0]]);
  };

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
                checked={option === range}
                onChange={() => {
                  return setRange(option);
                }}
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          );
        })}
      </fieldset>
      <div className='flex__responsive margin-top__xs'>
        {Array(range === 'between' ? 2 : 1).fill('').map((input, index) => {
          const point = (index === 1 || range === 'before') ? 'End' : 'Start';
          const id = `date-range-${point.toLowerCase()}-date`;
          return (
            <div key={index}>
              <label htmlFor={id}>{point} date</label>
              <input
                className='date-range-input-text'
                id={id}
                aria-describedby={`${id}-description`}
                type='text'
                value={years[index] || ''}
                onChange={(event) => {
                  return handleYearChange(index, event.target.value);
                }}
                autoComplete='on'
                pattern='[0-9]{4}'
              />
              <small id={`${id}-description`}>Please enter this format: YYYY</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DateRangeInput.propTypes = {
  currentFilter: PropTypes.string,
  datastoreUid: PropTypes.string.isRequired,
  filterGroupUid: PropTypes.string.isRequired
};

export default DateRangeInput;
