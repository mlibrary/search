import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import {
  Link
} from 'react-router-dom';

import {
  Icon
} from '../../../core'
import {
  setSearchQuery
} from '../../../search/actions'

class AdvancedPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      booleanTypes: ['AND', 'OR', 'NOT'],
      booleanFields: [
        {
          value: '',
          field: this.props.fields[0].uid,
        },
        {
          value: '',
          field: this.props.fields[0].uid,
          boolean: 0
        }
      ]
    }

    this.handleFieldInputValueChange = this.handleFieldInputValueChange.bind(this)
    this.handleOnBooleanSwitchChange = this.handleOnBooleanSwitchChange.bind(this)
    this.handleOnFieldChange = this.handleOnFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddAnotherField() {
    this.setState({
      booleanFields: [
        ...this.state.booleanFields,
        {
          value: '',
          field: this.props.fields[0].uid,
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

    // Build the query
    // example output: 'title:(parrots) AND author:(charles)'
    const query = this.state.booleanFields.reduce((memo, field) => {
      if (field.value.length > 0) {
        if (typeof field.boolean !== 'undefined') {
          memo.push(this.state.booleanTypes[field.boolean])
        }

        memo.push(`${field.field}:(${field.value})`)
      }

      return memo
    }, []).join(' ')

    if (query.length > 0) {
      //store.dispatch(setSearchQuery(query))
      console.log('TODO: AdvancedPage setSearchQuery')

      const activeDatastore = _.findWhere(this.props.datastores.datastores, {uid: this.props.datastores.active})

      //browserHistory.push(`/${activeDatastore.slug}?query=${encodeURI(query)}`)
      console.log('TODO advanced handleSubmit')
    }
  }

  handleFieldInputValueChange({ index, value }) {
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

  handleOnBooleanSwitchChange({ fieldIndex, switchOptionIndex }) {
    this.setState({
      booleanFields: this.state.booleanFields.map((item, index) => {
        if (index !== fieldIndex) {
          return item
        }

        return {
          ...item,
          boolean: switchOptionIndex
        }
      })
    })
  }

  handleOnFieldChange({ fieldIndex, optionValue }) {
    this.setState({
      booleanFields: this.state.booleanFields.map((item, index) => {
        if (index !== fieldIndex) {
          return item
        }

        return {
          ...item,
          field: optionValue
        }
      })
    })
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
                  handleFieldInputValueChange={this.handleFieldInputValueChange}
                  handleRemoveField={() => this.handleRemoveField({ removeIndex: index})}
                  handleOnBooleanSwitchChange={this.handleOnBooleanSwitchChange}
                  handleOnFieldChange={this.handleOnFieldChange}
                />
              ))}
              <div className="advanced-add-field-container">
                <button type="button" className="button-link-light" onClick={() => this.handleAddAnotherField()}>Add another field</button>
              </div>
            </div>
            <div className="container container-narrow advanced-search-button-container">
              <button type="submit" className="button advanced-search-button"><Icon name="search"/>Search</button>
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
  handleFieldInputValueChange,
  handleOnBooleanSwitchChange,
  handleOnFieldChange
}) => (
  <div>
    {index === 0 ? null : (
      <Switch
        options={['AND', 'OR', 'NOT']}
        fieldIndex={index}
        selectedIndex={field.boolean}
        onSwitchChange={handleOnBooleanSwitchChange}
      />
    )}
    <div className="advanced-input-container">
      <Dropdown
        options={fields}
        fieldIndex={index}
        handleOnFieldChange={handleOnFieldChange}
      />
      <input
        type="text"
        className="advanced-input"
        placeholder={`Search Term ${index + 1}`}
        value={field.value}
        onChange={(event) => handleFieldInputValueChange({ index, value: event.target.value })}
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

const Dropdown = ({
  fieldIndex,
  options,
  selectedOption,
  handleOnFieldChange
}) => (
  <select
    className="dropdown"
    value={selectedOption}
    onChange={(event) => handleOnFieldChange({
      fieldIndex,
      optionValue: event.target.value,
    })}
  >
    {options.map((option, index) =>
      <option value={option.uid} key={index}>{option.name}</option>
    )}
  </select>
)

const SwitchOption = ({
  option,
  optionIndex,
  isActive,
  onSwitchChange
}) => {
  return (
    <label key={optionIndex} className={`switch-option ${isActive ? 'switch-option-selected' : ''}`}>
      <span className="switch-option-label-text">{option}</span>
      <input
        type="radio"
        className="switch-option-input"
        checked={`${isActive ? 'selected' : ''}`}
        value={option}
        onChange={onSwitchChange}
      />
    </label>
  )
}

const Switch = ({
  options,
  fieldIndex,
  selectedIndex,
  onSwitchChange
}) => {
  return (
    <fieldset className="switch">
      <div className="switch-options">
        {options.map((option, optionIndex) => SwitchOption({
            option,
            optionIndex,
            isActive: selectedIndex === optionIndex,
            onSwitchChange: () => onSwitchChange({
              fieldIndex,
              switchOptionIndex: optionIndex
            }),
          })
        )}
      </div>
    </fieldset>
  )
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
