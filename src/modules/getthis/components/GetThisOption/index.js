import React from 'react'

class GetThisOption extends React.Component {
  render() {
    const { option } = this.props

    return (
      <details className="get-this-option">
        <summary className="get-this-option-summary">
          <h2 className="get-this-option-heading"><span className="get-this-option-heading-text">{option.label}</span><span className="get-this-option-subheading">{option.duration}</span></h2>
        </summary>

        <div className="get-this-option-details-container">
          <div className="get-this-option-left-half">
            {option.form ? (
              <p>[Need to add form here]</p>
            ) : (
              <p>[TBD]</p>
            )}
          </div>
          <div className="get-this-option-right-half">
            <div className="get-this-policies-container">
              <h4 className="get-this-policies-heading">Policies and additional information:</h4>

              <ul className="get-this-policies-list">
                {option.description.map((policy, key) => (
                  <li key={key}>{policy}</li>
                ))}
                {option.tip.map((policy, key) => (
                  <li key={key}>{policy}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </details>
    )
  }
}

export default GetThisOption
