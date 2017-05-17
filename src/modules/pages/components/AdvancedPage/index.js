import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import { Link } from 'react-router';

import {
  Icon
} from '../../../core'

/*
class AdvancedSearch extends React.Component {
  static propTypes = {
    fields: PropTypes.array.isRequired
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
*/

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

    this.handleFieldValueChange = this.handleFieldValueChange.bind(this)
    this.handleSwitchChange = this.handleSwitchChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  handleSubmit(event) {
    event.preventDefault()

    const query = this.state.booleanFields.reduce((memo, field) => {
      if (field.value !== '') {
        return memo = `${memo} ${field.value}`
      }

      return memo
    }, '').trim()

    console.log('query: ', query)
  }

  handleFieldValueChange({ index, value }) {
    this.setState({
      booleanFields: this.state.booleanFields.map((item, i) => {
        if (i !== index) {
          return item
        }

        return {
          ...item,
          value: value
        }
      })
    })
  }

  handleBooleanSwitchChange({ fieldIndex, booleanIndex }) {
    console.log('handleBooleanSwitchChange')
  }

  render() {
    const { datastores, fields } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <div>
        <div className="advanced-heading-container">
          <div className="container container-medium">
            <Link to={`/${activeDatastore.slug}`} className="advanced-link button-secondary">Back to Simple Search</Link>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="advanced-boolean-container">
            <div className="container container-narrow">
              <h1 className="advanced-heading">{activeDatastore.name} Advanced Search</h1>

              {this.state.booleanFields.map((field, index) => (
                <FieldInput
                  key={index}
                  index={index}
                  field={field}
                  fields={fields}
                  handleFieldValueChange={this.handleFieldValueChange}
                  handleRemoveField={() => this.handleRemoveField({ removeIndex: index})}
                  handleSwitchChange={this.handleSwitchChange}
                />
              ))}
              <div className="advanced-add-field-container">
                <button type="button" className="button-link-light" onClick={() => this.handleAddAnotherField()}>Add another field</button>
              </div>
            </div>
            <div className="container container-narrow advanced-search-button-container">
              <button type="submit" className="button advanced-search-button"><Icon name="search"/>Advanced Search</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const FieldInput = ({
  index,
  field,
  fields,
  handleRemoveField,
  handleFieldValueChange,
  handleSwitchChange
}) => (
  <div>
    {index === 0 ? null : <Switch options={['AND', 'OR', 'NOT']} onChangeEvent={handleSwitchChange}/>}
    <div className="advanced-input-container">
      <Dropdown options={fields} />
      <input
        type="text"
        className="advanced-input"
        placeholder={`Search Term ${index + 1}`}
        value={field.value}
        onChange={(event) => handleFieldValueChange({ index, value: event.target.value })}
      />
      {index > 0 ? (
        <button
          className="advanced-input-remove-button"
          type="button"
          onClick={handleRemoveField}>
            <Icon name="close"/>Remove field
        </button>
      ) : null}
    </div>
  </div>
)

const Dropdown = ({ options, selectedOption }) => (
  <select className="dropdown" value={selectedOption}>
    {options.map((option, index) =>
      <option value={option.uid} key={index}>{option.name}</option>
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
  const fields = state.search.data[state.datastores.active].fields.reduce((memo, field) => {
    memo.push({
      uid: field.uid,
      name: field.metadata.name
    })

    return memo
  }, [])

  return {
    datastores: state.datastores,
    fields: fields
  };
}

export default connect(mapStateToProps)(AdvancedPage);
