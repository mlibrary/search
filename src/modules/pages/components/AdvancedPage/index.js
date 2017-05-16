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
      booleanTypes: ['AND', 'OR', 'NOT'],
      booleanFields: [
        {
          value: '',
          field: 0,
        },
        {
          value: '',
          field: 0,
          boolean: 0
        }
      ]
    }
  }

  handleAddAnotherField() {
    this.setState({
      booleanFields: [
        ...this.state.booleanFields,
        {
          value: '',
          field: 0,
          boolean: 0
        }
      ]
    })
  }

  handleRemoveField({ removeIndex }) {
    const fields = this.state.booleanFields.filter((field, index) => removeIndex !== index)

    this.setState({
      booleanFields: fields
    })
  }

  render() {
    const { datastores } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <div>
        <div className="advanced-heading-container">
          <div className="container container-medium">
            <a href="" className="advanced-link button-secondary">Back to Simple Search</a>
          </div>
        </div>
        <div className="advanced-boolean-container">
          <div className="container container-narrow">
            <h1 className="advanced-heading">{activeDatastore.name} Advanced Search</h1>

            {this.state.booleanFields.map((field, index) => (
              <FieldInput
                key={index}
                index={index}
                handleRemoveField={() => this.handleRemoveField({ removeIndex: index})}
                field={field} />
            ))}
            <div className="advanced-add-field-container">
              <button className="button-link-light" onClick={() => this.handleAddAnotherField()}>Add another field</button>
            </div>
          </div>
          <div className="container container-narrow advanced-search-button-container">
            <button className="button advanced-search-button"><Icon name="search"/>Advanced Search</button>
          </div>
        </div>
      </div>
    )
  }
}

const FieldInput = ({ index, field, handleRemoveField }) => (
  <div>
    {index === 0 ? null : <Switch options={['AND', 'OR', 'NOT']} />}
    <div className="advanced-input-container">
      <Dropdown options={['All Fields', 'Title', 'Author']} />
      <input type="text" className="advanced-input" placeholder={`Search Term ${index + 1}`} />
      {index > 0 ? (
        <button
          className="advanced-input-remove-button"
          onClick={handleRemoveField}>
            <Icon name="close"/>Remove field
        </button>
      ) : null}
    </div>
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
