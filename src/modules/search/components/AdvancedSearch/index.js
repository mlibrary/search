import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { bindActionCreators } from 'redux'

import {
  Icon,
} from '../../../core'
import {
  getAdvancedFields,
  stringifySearchQueryForURL,
} from '../../../pride'

class AdvancedSearch extends React.Component {
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
    // example output: 'title:parrots AND author:charles'
    const query = this.state.booleanFields.reduce((memo, field) => {
      if (field.value.length > 0) {
        if (typeof field.boolean !== 'undefined') {
          memo.push(this.state.booleanTypes[field.boolean])
        }

        memo.push(`${field.field}:${field.value}`)
      }

      return memo
    }, []).join(' ')

    if (query.length > 0) {
      const { history } = this.props

      // Query is not empty
      if (query.length > 0) {
        const queryString = stringifySearchQueryForURL({
          query
        })

        const { datastores } = this.props;
        const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

        this.props.handleBasicSearchQueryChange(query)

        const url = `/${activeDatastore.slug}?${queryString}`

        history.push(url)
      }
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
    const { datastores, fields, match } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <form onSubmit={this.handleSubmit} className="advanced-search-form">
        <div className="advanced-search-container">
          <div className="advanced-header">
            <h1 className="advanced-heading">{activeDatastore.name} Advanced Search</h1>
            <Link to={`${match.url.replace(/([\/]advanced[\/]?)/g, "")}${this.props.searchQueryFromURL}`} className="advanced-to-basic-link">
              <Icon name="close"/><span className="offpage">Basic Search</span>
            </Link>
          </div>
          <div className="advanced-field-container">
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
          </div>
          <div className="advanced-add-field-container">
            <button type="button" className="button-link-light" onClick={() => this.handleAddAnotherField()}>Add another field</button>
          </div>
          <div className="container container-narrow advanced-search-button-container">
            <button type="submit" className="button advanced-search-button">
              <span className="flex-center">
                <Icon name="search"/>Search
              </span>
            </button>
          </div>
        </div>
      </form>
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
  <fieldset style={{ margin: 0 }}>
    <legend className="offpage">Search field {index + 1}</legend>
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
            <Icon name="close"/><span className="offpage">Remove Field</span>
        </button>
      ) : null}
    </div>
  </fieldset>
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
  const fields = getAdvancedFields({
    datastoreUid: state.datastores.active,
    data: state.search.data[state.datastores.active],
  })

  return {
    datastores: state.datastores,
    fields: fields,
    searchQuery: state.search.query
  };
}

export default withRouter(
  connect(mapStateToProps)(AdvancedSearch)
)
