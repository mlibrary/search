import './styles.css';
import React, { useEffect, useMemo, useState } from 'react';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const Multiselect = ({ currentFilters, datastoreUid, filterGroupUid, filters = {}, name }) => {
  const dispatch = useDispatch();
  const [filterQuery, setFilterQuery] = useState('');
  const [showOnlySelectedOptions, setShowOnlySelectedOptions] = useState(false);

  const options = useMemo(() => {
    return filters.map(({ isActive, value }) => {
      return {
        checked: isActive,
        name: value,
        value
      };
    });
  }, [filters]);

  if (!options.length) {
    return null;
  }

  useEffect(() => {
    currentFilters.forEach((filterValue) => {
      dispatch(setAdvancedFilter({
        datastoreUid,
        filterGroupUid,
        filterValue
      }));
    });
  }, []);

  const selectedOptions = useMemo(() => {
    return options.filter((option) => {
      return option.checked;
    });
  }, [options]);

  const handleOptionSelection = ({ filterValue }) => {
    dispatch(setAdvancedFilter({
      datastoreUid,
      filterGroupUid,
      filterValue
    }));
    if (showOnlySelectedOptions && selectedOptions.length === 1) {
      setShowOnlySelectedOptions(false);
    }
  };

  const isOptionFiltered = ({ optionName }) => {
    return filterQuery.length > 0 && !optionName.toLowerCase().includes(filterQuery.toLowerCase());
  };

  return (
    <div className='multiselect y-spacing'>
      <p className='font-small'>Select one or more checkboxes to narrow your results to items that match all of your {name.toLowerCase()} selections.</p>
      <input
        type='text'
        className='font-small'
        aria-label={`Filter options for ${name}`}
        aria-describedby={filterGroupUid}
        placeholder='Filter'
        value={filterQuery}
        onChange={(event) => {
          return setFilterQuery(event.target.value);
        }}
        autoComplete='on'
      />
      <p id={filterGroupUid} className='visually-hidden'>Below this edit box is a list of check boxes that allow you to filter down your options. As you type in this edit box, the list of check boxes is updated to reflect only those that match the query typed in this box.</p>
      <fieldset className='multiselect-options container__rounded padding__xs padding-top__2xs'>
        <legend className='visually-hidden'>Filter Options</legend>
        <ul className='list__unstyled'>
          {options.map((option, index) => {
            const { checked, name: optionName, value: filterValue } = option;
            if ((!showOnlySelectedOptions && isOptionFiltered({ optionName })) || (showOnlySelectedOptions && !checked)) {
              return null;
            }
            return (
              <li key={index} className='margin-top__2xs'>
                <label className='font-small'>
                  <input
                    type='checkbox'
                    checked={checked}
                    onChange={() => {
                      return handleOptionSelection({ filterValue });
                    }}
                  />
                  <span>{optionName}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>
      {selectedOptions.length > 0 && (
        <button
          type='button'
          className='button-link-light font-small margin-top__xs'
          onClick={() => {
            return setShowOnlySelectedOptions((prev) => {
              return !prev;
            });
          }}
        >
          Show {showOnlySelectedOptions ? 'all options' : `only selected options (${selectedOptions.length})`}
        </button>
      )}
    </div>
  );
};

export default Multiselect;
