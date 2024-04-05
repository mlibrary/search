import React from 'react';
import PropTypes from 'prop-types';

const MultipleChoice = ({
  name,
  options,
  selectedIndex,
  heading,
  onMultipleChoiceChange
}) => {
  return (
    <fieldset>
      {heading && (
        <legend className='offscreen'>{heading}</legend>
      )}

      {options.map((option, index) => {
        return (
          <label
            className='multiple-choice'
            key={index}
            htmlFor={`${name}-radio-${index}`}
          >
            <input
              type='radio'
              checked={`${selectedIndex === index ? 'selected' : ''}`}
              value={option}
              onChange={() => {
                return onMultipleChoiceChange({
                  option,
                  index
                });
              }}
              id={`${name}-radio-${index}`}
              name={name}
            />
            <span>{option}</span>
          </label>
        );
      })}
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
