import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';

const dateRangeOptions = ['before', 'after', 'between', 'in'];

const DateRangeInput = ({ datastoreUid, filterGroupUid }) => {
  const dispatch = useDispatch();
  const [range, setRange] = useState(dateRangeOptions[0]);
  const [firstYear, setFirstYear] = useState('');
  const [secondYear, setSecondYear] = useState('');
  const { [filterGroupUid]: urlFilters = [] } = useSelector((state) => {
    return state.filters.active[datastoreUid] || {};
  });
  const { activeFilters = {} } = useSelector((state) => {
    return state.advanced[datastoreUid] || {};
  });
  const advancedFilters = useMemo(() => {
    return activeFilters[filterGroupUid] || [];
  }, [activeFilters, filterGroupUid]);

  useEffect(() => {
    // Make sure the URL filters and the advanced filters match on load
    const currentFilters = [
      ...urlFilters.filter((urlFilter) => {
        return !advancedFilters.includes(urlFilter);
      }),
      ...advancedFilters.filter((advancedFilter) => {
        return !urlFilters.includes(advancedFilter);
      })
    ];
    currentFilters.forEach((filterValue) => {
      dispatch(setAdvancedFilter({
        datastoreUid,
        filterGroupUid,
        filterValue,
        onlyOneFilterValue: true
      }));
      const splitFilter = filterValue.split(' ');
      const rangeValue = splitFilter.find((value) => {
        return isNaN(value);
      });
      const yearValues = splitFilter.filter((value) => {
        return !isNaN(value);
      });
      setRange('in');
      if (rangeValue) {
        setRange(rangeValue === 'to' ? 'between' : rangeValue);
      }
      yearValues.forEach((year, index) => {
        if (index === 1) {
          setSecondYear(year);
        } else {
          setFirstYear(year);
        }
      });
    });
  }, []);

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
  }, [range, firstYear, secondYear, dispatch, datastoreUid, filterGroupUid]);

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
                  setRange(dateRangeOption);
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
