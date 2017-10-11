import React from 'react';

class ScopeDown extends React.Component {
  render() {
    const { options, handleChange } = this.props

    return (
      <div>
        {options.map((option, index) => (
          <Dropdown
            key={index}
            option={option}
            label={option.label}
            options={option.filters}
            selected={option.activeFilter}
            handleChange={handleChange}
          />
        ))}
      </div>
    )
  }
}

const Dropdown = ({ option, label, options, selected, handleChange }) => (
  <fieldset className="scopedown-dropdown-container">
    <label>
      <span className="scopedown-label-text">{label}</span>
      <select
        className="dropdown scopedown-dropdown"
        onChange={(e) => handleChange({ uid: option.uid, value: e.target.value })}
        value={selected}
      >
        {options.map((opt, index) => (
          <option
            key={index}
            value={opt}
          >
            {opt}
          </option>
        ))}
      </select>
    </label>
  </fieldset>
)

export default ScopeDown
