import React from 'react';
import PropTypes from 'prop-types';

class ScopeDown extends React.Component {
  render () {
    const { options, handleChange } = this.props;

    return (
      <div className='scopedown-container'>
        {options.map((option, index) => {
          return (
            <Dropdown
              key={index}
              option={option}
              label={option.label}
              options={option.filters}
              selected={option.activeFilter}
              handleChange={handleChange}
            />
          );
        })}
      </div>
    );
  }
}

ScopeDown.propTypes = {
  options: PropTypes.array,
  handleChange: PropTypes.func
};

const Dropdown = ({ option, label, options, selected, handleChange }) => {
  if (options.length <= 1) {
    return null;
  }

  return (
    <fieldset className='scopedown-dropdown-container'>
      <legend className='visually-hidden'>Narrow Search Options</legend>
      <label htmlFor={`scope-${label.toLowerCase().replaceAll(' ', '-')}`}>
        {label}
      </label>
      <select
        className='dropdown scopedown-dropdown'
        id={`scope-${label.toLowerCase().replaceAll(' ', '-')}`}
        onChange={(e) => {
          return handleChange({ uid: option.uid, value: e.target.value });
        }}
        value={selected}
        autoComplete='off'
      >
        {options.map((opt, index) => {
          return (
            <option
              key={index}
              value={opt}
            >
              {opt}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
};

Dropdown.propTypes = {
  option: PropTypes.object,
  label: PropTypes.string,
  options: PropTypes.array,
  selected: PropTypes.string,
  handleChange: PropTypes.func
};

export default ScopeDown;
