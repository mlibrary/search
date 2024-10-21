import './styles.css';
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { setAdvancedFilter } from '../../../advanced';
import { useDispatch } from 'react-redux';

const Multiselect = ({ advancedFilter, datastoreUid }) => {
  const dispatch = useDispatch();
  const [filterQuery, setFilterQuery] = useState('');
  const [showOnlySelectedOptions, setShowOnlySelectedOptions] = useState(false);

  const options = useMemo(() => {
    return advancedFilter.filters.map(({ isActive, value }) => {
      return {
        checked: isActive,
        name: value,
        value
      };
    });
  }, [advancedFilter.filters]);

  const selectedOptions = useMemo(() => {
    return options.filter((option) => {
      return option.checked;
    });
  }, [options]);

  const handleOptionSelection = (option) => {
    dispatch(setAdvancedFilter({
      datastoreUid,
      filterGroupUid: advancedFilter.uid,
      filterValue: option.value
    }));
    if (showOnlySelectedOptions && selectedOptions.length === 1) {
      setShowOnlySelectedOptions(false);
    }
  };

  const isOptionFiltered = (name) => {
    return filterQuery.length > 0 && !name.toLowerCase().includes(filterQuery.toLowerCase());
  };

  if (!options.length) {
    return null;
  }

  return (
    <div className='multiselect y-spacing'>
      <p className='font-small'>Select one or more checkboxes to narrow your results to items that match all of your {advancedFilter.name.toLowerCase()} selections.</p>
      <input
        type='text'
        className='font-small'
        aria-label='Filter options'
        aria-describedby={advancedFilter.uid}
        placeholder='Filter'
        value={filterQuery}
        onChange={(event) => {
          return setFilterQuery(event.target.value);
        }}
        autoComplete='on'
      />
      <p id={advancedFilter.uid} className='visually-hidden'>Below this edit box is a list of check boxes that allow you to filter down your options. As you type in this edit box, the list of check boxes is updated to reflect only those that match the query typed in this box.</p>
      <fieldset className='multiselect-options container__rounded padding__xs padding-top__2xs'>
        <legend className='visually-hidden'>Filter Options</legend>
        <ul className='list__unstyled'>
          {options.map((option, index) => {
            const { checked, name } = option;
            if ((!showOnlySelectedOptions && isOptionFiltered(name)) || (showOnlySelectedOptions && !checked)) {
              return null;
            }
            return (
              <li key={index} className='margin-top__2xs'>
                <label className='font-small'>
                  <input
                    type='checkbox'
                    checked={checked}
                    onChange={() => {
                      return handleOptionSelection(option);
                    }}
                  />
                  <span>{name}</span>
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

Multiselect.propTypes = {
  advancedFilter: PropTypes.object,
  datastoreUid: PropTypes.string
};

export default Multiselect;
