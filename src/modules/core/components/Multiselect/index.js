import React, { useState } from 'react';
import { Checkbox } from '../../../reusable';
import PropTypes from 'prop-types';

const Multiselect = ({ descriptionText, filterGroupUid, handleSelection, options }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [showOnlySelectedOptions, setshowOnlySelectedOptions] = useState(false);
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
      {descriptionText && <p className='font-small'>{descriptionText}</p>}
      <input
        type='text'
        className='multiselect-search'
        aria-label='Filter options'
        aria-describedby={filterGroupUid}
        placeholder='Filter'
        value={filterQuery}
        onChange={(event) => {
          setFilterQuery(event.target.value);
        }}
        autoComplete='on'
      />
      <p id={filterGroupUid} className='visually-hidden'>Below this edit box is a list of check boxes that allow you to filter down your options. As you type in this edit box, the list of check boxes is updated to reflect only those that match the query typed in this box.</p>
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
                  <MultiselectOption
                    handleClick={() => {
                      return handleOptionSelection(option, index);
                    }}
                    option={option}
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
          {showOnlySelectedOptions ? 'Show all options' : `Show only selected options (${selectedOptions.length})`}
        </button>
      )}
    </div>
  );
};

Multiselect.propTypes = {
  descriptionText: PropTypes.string,
  filterGroupUid: PropTypes.string,
  handleSelection: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    name: PropTypes.string,
    value: PropTypes.string
  }))
};

export default Multiselect;

const MultiselectOption = ({ option, handleClick }) => {
  return (
    <Checkbox
      isChecked={option.checked}
      label={option.name}
      handleClick={handleClick}
    />
  );
};

MultiselectOption.propTypes = {
  handleClick: PropTypes.func,
  option: PropTypes.object
};
