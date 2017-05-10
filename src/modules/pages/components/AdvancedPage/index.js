import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import {
  DatastoreNavigation
} from '../../../datastores'

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
            <FieldInput index={0}/>
            <Switch options={['AND', 'OR', 'NOT']} />
            <FieldInput index={1} />
            <div className="advanced-add-field-container">
              <button className="button-link-light">Add another field</button>
            </div>
          </div>
        </div>
        <div className="container container-narrow advanced-search-button-container">
          <button className="button advanced-search-button"><Icon name="search"/>Advanced Search</button>
        </div>
      </div>
    )
  }
}

const FieldInput = ({ index }) => (
  <div className="advanced-input-container">
    <Dropdown options={['All Fields', 'Title', 'Author']} />
    <input type="text" className="advanced-input" placeholder={`Search Term ${index + 1}`} />
    {index > 0 ? (
      <button className="advanced-input-remove-button"><Icon name="close"/>Remove field</button>
    ) : null}
  </div>
)

const Dropdown = ({ options }) => (
  <select className="dropdown">
    {options.map((option, index) =>
      <option value={option} key={index}>{option}</option>
    )}
  </select>
)

const SwitchOption = ({ option, index, isActive, handleOptionChange }) => {
  return (
    <label key={index} className={`switch-option ${isActive ? 'switch-option-selected' : ''}`}>
      <span className="switch-option-label-text">{option}</span>
      <input
        type="radio"
        className="switch-option-input"
        checked={`${isActive ? 'selected' : ''}`}
        value={option}
        onChange={handleOptionChange}
      />
    </label>
  )
}

class Switch extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedOption: 0
    }

    this.handleOptionChange.bind(this)
  }

  handleOptionChange(index) {
    this.setState({
      selectedOption: index
    })
  }

  render() {
    const { options } = this.props;

    return (
      <fieldset className="switch">
        <div className="switch-options">
          {options.map((option, index) => SwitchOption({
              option,
              index,
              isActive: this.state.selectedOption === index,
              handleOptionChange: () => this.handleOptionChange(index),
            })
          )}
        </div>
      </fieldset>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
  };
}

export default connect(mapStateToProps)(AdvancedPage);
