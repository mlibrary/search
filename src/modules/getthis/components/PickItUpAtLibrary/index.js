import React from 'react'
import { Link } from 'react-router-dom'

class PickItUpAtLibrary extends React.Component {
  render() {
    return (
      <details className="get-this-option">
        <summary className="get-this-option-summary">
          <h2 className="get-this-option-heading">Pick it up at the library<span className="get-this-option-subheading">Expected availability 1-3 days (Library-to-library)</span></h2>
        </summary>

        <div className="get-this-option-details-container">
          <div className="get-this-option-left-half">
            <label className="get-this-option-label">Pickup location</label>
            <select className="dropdown">
              <option>Choose a pickup location</option>
            </select>

            <fieldset>
              <legend className="get-this-option-label">Cancel this hold after</legend>

              <div className="get-this-field-group-inline">
                <label>Month</label>
                <select className="dropdown">
                  <option>MM</option>
                </select>
              </div>

              <div className="get-this-field-group-inline">
                <label>Day</label>
                <select className="dropdown">
                  <option>DD</option>
                </select>
              </div>

              <div class="get-this-field-group-inline">
                <label>Year</label>
                <input type="text" placeholder="YYYY" className="get-this-field-input-year"></input>
              </div>
            </fieldset>


            <Link to="#" className="button margin-y-half">Get me this item</Link>
          </div>
          <div className="get-this-option-right-half">
            <div className="get-this-policies-container">
              <h4 className="get-this-policies-heading">Policies and additional information:</h4>

              <ul className="get-this-policies-list">
                <li>Standard loan and renwal policies apply.</li>
                <li>Can't find your book on the shelf? Use this option and we'll look for it.</li>
              </ul>
            </div>
          </div>
        </div>
      </details>
    )
  }
}

export default PickItUpAtLibrary
