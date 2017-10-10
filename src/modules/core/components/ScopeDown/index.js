import React from 'react';

class ScopeDown extends React.Component {
  render() {
    const { options, handleChange } = this.props

    console.log('options', options)

    return (
      <div>
        {options.map(option => (
          <Dropdown
            key={option.uid}
            label={option.label}
            options={option.options}
            selected={option.selected}
            handleChange={handleChange}
          />
        ))}
      </div>
    )
  }
}

const Dropdown = ({ key, label, options, selected, handleChange }) => (
  <fieldset className="scopedown-dropdown-container" key={key}>
    <label>
      <span className="scopedown-label-text">{label}</span>
      <select className="dropdown scopedown-dropdown" onChange={handleChange}>
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </fieldset>
)

export default ScopeDown
