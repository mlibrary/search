import React from 'react';

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

export default MultipleChoice;
