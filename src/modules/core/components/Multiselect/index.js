import React, { useState } from 'react';
import { Checkbox } from '../../../reusable';
import PropTypes from 'prop-types';

const Multiselect = ({ advancedFilter, handleSelection }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [showOnlySelectedOptions, setshowOnlySelectedOptions] = useState(false);
  const options = advancedFilter.filters.map((option) => {
    return {
      checked: option.isActive,
      name: option.value,
      value: option.value
    };
  });
  const selectedOptions = options.filter((option) => {
    return option.checked;
  });

  const handleOptionSelection = (option, index) => {
    handleSelection(index, option);
    if (showOnlySelectedOptions) {
      if (selectedOptions.length === 1) {
        setshowOnlySelectedOptions(false);
      }
    }
  };

  const isOptionFiltered = (option) => {
    if (filterQuery.length === 0) {
      return false;
    }
    return !(option.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1);
  };

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className='multiselect'>
      <p className='font-small'>Select one or more checkboxes to narrow your results to items that match all of your {advancedFilter.name.toLowerCase()} selections.</p>
      <input
        type='text'
        className='multiselect-search'
        aria-label='Filter options'
        aria-describedby={advancedFilter.uid}
        placeholder='Filter'
        value={filterQuery}
        onChange={(event) => {
          setFilterQuery(event.target.value);
        }}
        autoComplete='on'
      />
      <p id={advancedFilter.uid} className='visually-hidden'>Below this edit box is a list of check boxes that allow you to filter down your options. As you type in this edit box, the list of check boxes is updated to reflect only those that match the query typed in this box.</p>
      <fieldset className='multiselect-options'>
        <legend className='visually-hidden'>Filter Options</legend>
        <ul className='multiselect-options-list'>
          {options.map((option, index) => {
            if (isOptionFiltered(option) && !showOnlySelectedOptions) {
              return null;
            }
            if (!showOnlySelectedOptions || (showOnlySelectedOptions && option.checked)) {
              return (
                <li className='multiselect-options-list-item' key={index}>
                  <Checkbox
                    isChecked={option.checked}
                    label={option.name}
                    handleClick={() => {
                      return handleOptionSelection(option, index);
                    }}
                  />
                </li>
              );
            }
            return null;
          })}
        </ul>
      </fieldset>
      {selectedOptions.length > 0 && (
        <button
          type='button'
          className='button-link-light multiselect-show-checked-toggle'
          onClick={() => {
            setshowOnlySelectedOptions(!showOnlySelectedOptions);
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
  handleSelection: PropTypes.func
};

export default Multiselect;
