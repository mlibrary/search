import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const options = ['before', 'after', 'between', 'in'];

const extractYears = (dateString) => {
  return dateString.match(/\d+/gu) || [''];
};

const extractRange = (dateString) => {
  const years = extractYears(dateString);
  if (!years[0]) {
    return 'before';
  }
  if (years.length > 1) {
    return 'between';
  }
  return ['before', 'after'].find((prefix) => {
    return dateString.startsWith(prefix);
  }) || 'in';
};

const minValue = 1000;
const maxValue = new Date().getFullYear();
const minValues = [minValue, minValue + 1];
const maxValues = [maxValue - 1, maxValue];

const DateRangeInput = ({ currentFilter = '', datastoreUid, filterGroupUid }) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(extractRange(currentFilter));
  const [years, setYears] = useState(extractYears(currentFilter));
  const [min, setMin] = useState(minValues);
  const [max, setMax] = useState(maxValues);

  const updateFilter = useCallback((filterValue) => {
    dispatch(setAdvancedFilter({ datastoreUid, filterGroupUid, filterValue, onlyOneFilterValue: true }));
  }, [dispatch, datastoreUid, filterGroupUid]);

  useEffect(() => {
    updateFilter(currentFilter);
  }, [currentFilter, updateFilter]);

  useEffect(() => {
    let filterValue = '';
    if (years.some(Boolean)) {
      if (range === 'between') {
        filterValue = years.filter(Number).join(' to ');
      } else {
        filterValue = ['before', 'after'].includes(range) ? `${range} ${years[0]}` : years[0];
      }
    }
    updateFilter(filterValue);
  }, [range, years, updateFilter]);

  const handleYearChange = useCallback((index, value) => {
    if (range === 'between') {
      const newYears = [...years];
      newYears[index] = value;
      const newMin = [...min];
      const newMax = [...max];
      if (index === 0) {
        newYears[1] = value ? newYears[1] : '';
        newMin[1] = value && value < maxValues[1] - 1 ? Math.max(minValues[1], Number(value) + 1) : minValues[1];
      } else {
        newMax[0] = value && value > minValues[0] + 1 ? Math.min(maxValues[0], Number(value) - 1) : maxValues[0];
      }
      setYears(newYears);
      setMin(newMin);
      setMax(newMax);
    } else {
      setYears([value]);
    }
  }, [range, years, min, max]);

  return (
    <div className='date-range-input'>
      <fieldset className='flex__responsive'>
        <legend className='visually-hidden'>Select the type of date range to search on</legend>
        {options.map((option, index) => {
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
          const label = (index === 1 || range === 'before') ? 'End' : 'Start';
          const id = `date-range-${label.toLowerCase()}-date`;
          return (
            <div key={index}>
              <label htmlFor={id}>{label} date</label>
              <input
                className='date-range-input-number'
                id={id}
                aria-describedby={`${id}-description`}
                type='number'
                value={years[index] || ''}
                disabled={index > 0 && !years[index - 1]}
                min={range === 'between' ? min[index] : minValue}
                max={range === 'between' ? max[index] : maxValue}
                onChange={(event) => {
                  return handleYearChange(index, event.target.value);
                }}
                autoComplete='on'
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
