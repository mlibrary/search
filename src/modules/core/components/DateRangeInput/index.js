import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const dateRangeOptions = ['before', 'after', 'between', 'in'];

const DateRangeInput = ({ datastoreUid, filterGroupUid }) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(dateRangeOptions[0].toLocaleLowerCase());
  const [firstYear, setFirstYear] = useState('');
  const [secondYear, setSecondYear] = useState('');

  useEffect(() => {
    if (range && firstYear) {
      let filterValue = ['before', 'after'].includes(range) ? `${range} ${firstYear}` : firstYear;
      if (range === 'between' && secondYear) {
        filterValue += ` to ${secondYear}`;
      }
      dispatch(setAdvancedFilter({
        datastoreUid,
        filterGroupUid,
        filterValue,
        onlyOneFilterValue: true
      }));
    }
  }, [range, firstYear, secondYear]);

  return (
    <div className='date-range-input'>
      <fieldset className='flex__responsive'>
        <legend className='visually-hidden'>Select the type of date range to search on</legend>
        {dateRangeOptions.map((dateRangeOption, index) => {
          return (
            <label key={index}>
              <input
                type='radio'
                name='date-range-input'
                value={dateRangeOption}
                checked={dateRangeOption === range}
                onChange={() => {
                  return setRange(dateRangeOption);
                }}
              />
              {dateRangeOption.charAt(0).toUpperCase() + dateRangeOption.slice(1)}
            </label>
          );
        })}
      </fieldset>
      <div className='flex__responsive margin-top__xs'>
        {Array.from({ length: range === 'between' ? 2 : 1 }).map((input, index) => {
          const point = (index === 1 || range === 'before') ? 'end' : 'start';
          return (
            <div key={index}>
              <label htmlFor={`date-range-${point}-date`}>{point.charAt(0).toUpperCase() + point.slice(1)} date</label>
              <input
                className='date-range-input-text'
                id={`date-range-${point}-date`}
                aria-describedby={`date-range-${point}-date-description`}
                type='text'
                value={index === 1 ? secondYear : firstYear}
                onChange={(event) => {
                  if (range !== 'between') {
                    setSecondYear('');
                  }
                  return index === 1 ? setSecondYear(event.target.value) : setFirstYear(event.target.value);
                }}
                autoComplete='on'
                pattern='[0-9]{4}'
              />
              <small id={`date-range-${point}-date-description`}>Please enter this format: YYYY</small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

DateRangeInput.propTypes = {
  datastoreUid: PropTypes.string,
  filterGroupUid: PropTypes.string
};

export default DateRangeInput;
