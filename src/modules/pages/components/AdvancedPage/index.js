import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import {
  Icon
} from '../../../core'

class AdvancedPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      booleans: ['AND', 'OR', 'NOT'],
      query: {
        type: 'field_boolean',
        value: 'AND',
        children: [
          {
            type: 'field',
            value: 'title',
            children: [
              {
                type: 'literal',
                value: 'climate change'
              }
            ]
          },
          {
            type: 'field',
            value: 'author',
            children: [
              {
                type: 'literal',
                value: 'international energy agency'
              }
            ]
          }
        ]
      }
    }
  }

  addBooleanInput() {
    console.log('addBooleanInput')
  }

  render() {
    const { datastores } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <div>
        <div className="advanced-heading-container">
          <div className="container container-medium advanced-heading-container-flex">
            <a href="" className="advanced-link">Back to Simple Search</a>
            <h1 className="advanced-heading">{activeDatastore.name} Advanced Search</h1>
            <a href="" className="advanced-link">Advanced Search Tips</a>
          </div>
        </div>
        <div className="advanced-boolean-container">
          <div className="container container-narrow">
            <BooleanInput />
            <Switch options={['AND', 'OR', 'NOT']} />
            <BooleanInput />
            <div className="advanced-add-field-container">
              <button className="button-link-light">Add another field</button>
            </div>
          </div>
          <div className="container container-narrow advanced-search-button-container">
            <button className="button advanced-search-button"><Icon name="search"/>Search</button>
          </div>
        </div>
      </div>
    )
  }
}

const BooleanInput = () => (
  <div className="advanced-input-container">
    <Dropdown options={['Title', 'Author']} />
    <input type="text" className="advanced-input" />
  </div>
)

const Dropdown = ({ options }) => (
  <select className="dropdown">
    {options.map((option, index) =>
      <option value={option} key={index}>{option}</option>
    )}
  </select>
)

const Switch = ({ options }) => (
  <radiogroup className="switch">
    {options.map((option, index) =>
      <label key={index} className="switch-option">
        <span className="switch-option-label-text">{option}</span>
        <input type="radio" value={option} className="switch-option-input" />
      </label>
    )}
  </radiogroup>
)

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
  };
}

export default connect(mapStateToProps)(AdvancedPage);
