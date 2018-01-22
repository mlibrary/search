import React from 'react'

import {
  GetThisForm
} from '../../../getthis'

const createMarkup = (html) => {
  return { __html: html };
};

class GetThisOption extends React.Component {
  render() {
    const { option } = this.props

    return (
      <details className="get-this-option">
        <summary className="get-this-option-summary">
          <h3 className="get-this-option-heading"><span className="get-this-option-heading-text">{option.label}</span><span className="get-this-option-subheading">{option.service_type && (<span> {option.service_type} </span>)}({option.duration})</span></h3>
        </summary>

        <div className="get-this-option-details-container">
          <div className="get-this-option-left-half">
            <GetThisForm form={option.form} />
          </div>

          {option.description && (
            <div className="get-this-option-right-half">
              <div className="get-this-policies-container">
                {option.description.heading && (
                  <h4 className="get-this-policies-heading">{option.description.heading}</h4>
                )}
                {option.description.content && (
                  <ul className="get-this-policies-list">
                    {option.description.content.map((policy, key) => (
                      <li key={key} dangerouslySetInnerHTML={createMarkup(policy)} />
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </details>
    )
  }
}

export default GetThisOption
