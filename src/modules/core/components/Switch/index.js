import React from 'react';

const SwitchOption = ({
  option,
  index,
  isActive,
  onSwitchChange
}) => {
  return (
    <label key={index} className={`switch-option ${isActive ? 'switch-option-selected' : ''}`}>
      <span className="switch-option-label-text">{option}</span>
      <input
        type="radio"
        className="switch-option-input"
        checked={`${isActive ? 'selected' : ''}`}
        value={option}
        onChange={onSwitchChange}
      />
    </label>
  )
}

const Switch = ({
  options,
  selectedIndex,
  onSwitchChange
}) => {
  return (
    <fieldset className="switch">
      <div className="switch-options">
        {options.map((option, index) => SwitchOption({
            option,
            index,
            isActive: selectedIndex === index,
            onSwitchChange: () => onSwitchChange({
              switchOption: option,
              switchIndex: index,
            }),
          })
        )}
      </div>
    </fieldset>
  )
}

export default Switch
