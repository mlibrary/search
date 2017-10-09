import React from 'react';

class ScopeDown extends React.Component {
  render() {
    const { options } = this.props

    if (!options) {
      return null
    }

    console.log('options', options)

    return (
      <div>
        {options.map(option => (
          <fieldset key={option.uid}>
            <label>
              <span>{option.field}</span>
              <select className="dropdown">
                {option.values.map(value => (
                  <option key={value.value}>{value.label}</option>
                ))}
              </select>
            </label>
          </fieldset>
        ))}
      </div>
    )
  }
}

export default ScopeDown
