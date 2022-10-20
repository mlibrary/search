import React from 'react';
import PropTypes from 'prop-types';

class ScopeDown extends React.Component {
  render() {
    const { options, handleChange } = {...this.props};

    return (
      <div className="scopedown-container">
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

const Dropdown = ({ option, label, options, selected, handleChange }) => {
  if (options.length <= 1) {
    return null;
  }

  return (
    <fieldset className="scopedown-dropdown-container">
      <label>
        <span className="scopedown-label-text">{label}</span>
        <select
          className="dropdown scopedown-dropdown"
          onChange={(e) => {
            return handleChange({ uid: option.uid, value: e.target.value });
          }}
          value={selected}
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
      </label>
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
