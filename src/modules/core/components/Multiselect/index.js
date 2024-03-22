import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../reusable';

function Multiselect (props) {
  const [filterQuery, setFilterQuery] = useState('');
  const [showOnlySelectedOptions, setshowOnlySelectedOptions] = useState(false);
  const selectedOptions = props.options.filter((option) => {
    return option.checked;
  });

  function handleOptionSelection (option, index) {
    props.handleSelection(index, option);
    if (showOnlySelectedOptions) {
      if (selectedOptions.length === 1) {
        setshowOnlySelectedOptions(false);
      }
    }
  }

  function isOptionFiltered (option) {
    if (filterQuery.length === 0) {
      return false;
    }
    return !(option.name.toLowerCase().indexOf(filterQuery.toLowerCase()) !== -1);
  }

  if (!props.options || props.options.length === 0) {
    return null;
  }

  return (
    <div className='multiselect'>
      {props.descriptionText && (
        <p className='font-small'>{props.descriptionText}</p>
      )}
      <input
        type='text'
        className='multiselect-search'
        aria-label='Filter options'
        aria-describedby={props.filterGroupUid}
        placeholder='Filter'
        value={filterQuery}
        onChange={(event) => {
          setFilterQuery(event.target.value);
        }}
      />
      <p id={props.filterGroupUid} className='offscreen'>Below this edit box is a list of check oxes that allow you to filter down your options. As you type in this edit box, the list of check boxes is updated to reflect only those that match the query typed in this box.</p>
      <fieldset className='multiselect-options'>
        <ul className='multiselect-options-list'>
          {props.options.map((option, index) => {
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
      {selectedOptions.length > 0
        ? (
          <button
            type='button'
            className='button-link-light multiselect-show-checked-toggle'
            onClick={() => {
              setshowOnlySelectedOptions(!showOnlySelectedOptions);
            }}
          >
            {showOnlySelectedOptions
              ? (
                <span>Show all options</span>
                )
              : (
                <span>{`Show only selected options (${selectedOptions.length})`}</span>
                )}
          </button>
          )
        : null}
    </div>
  );
}

Multiselect.propTypes = {
  handleSelection: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    checked: PropTypes.bool,
    value: PropTypes.string,
    name: PropTypes.string
  })),
  filterGroupUid: PropTypes.string,
  descriptionText: PropTypes.string
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
  option: PropTypes.object,
  handleClick: PropTypes.func
};
