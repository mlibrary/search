import React from 'react';
import PropTypes from 'prop-types';

const MultipleChoiceOption = ({
  name,
  option,
  index,
  isActive,
  onMultipleChoiceChange
}) => {
  return (
    <label
      className='multiple-choice'
      key={index}
      htmlFor={`${name}-radio-${index}`}
    >
      <input
        type='radio'
        checked={`${isActive ? 'selected' : ''}`}
        value={option}
        onChange={onMultipleChoiceChange}
        id={`${name}-radio-${index}`}
        name={name}
      />
      <span>{option}</span>
    </label>
  );
};

MultipleChoiceOption.propTypes = {
  name: PropTypes.string,
  option: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  onMultipleChoiceChange: PropTypes.func
};

const MultipleChoice = ({
  name,
  options,
  selectedIndex,
  heading,
  onMultipleChoiceChange
}) => {
  return (
    <fieldset className='no-margin'>
      {heading && (
        <legend className='offscreen'>{heading}</legend>
      )}

      {options.map((option, index) => {
        return MultipleChoiceOption({
          name,
          option,
          index,
          isActive: selectedIndex === index,
          onMultipleChoiceChange: () => {
            return onMultipleChoiceChange({
              option,
              index
            });
          }
        });
      }
      )}
    </fieldset>
  );
};

MultipleChoice.propTypes = {
  name: PropTypes.string,
  options: PropTypes.array,
  selectedIndex: PropTypes.number,
  heading: PropTypes.string,
  onMultipleChoiceChange: PropTypes.func
};

export default MultipleChoice;
