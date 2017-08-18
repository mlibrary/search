import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { _ } from 'underscore';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import {
  Icon,
} from '../../../core'
import {
  getAdvancedFields,
  getAdvancedFilters,
  stringifySearchQueryForURL,
} from '../../../pride'

import {
  removeAdvancedField,
  setAdvancedField
} from '../../../search'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.handleAdvancedFieldQueryChange = this.handleAdvancedFieldQueryChange.bind(this)
    this.handleOnBooleanSwitchChange = this.handleOnBooleanSwitchChange.bind(this)
    this.handleOnFieldChange = this.handleOnFieldChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddAnotherField() {
    /*
    this.setState({
      booleanFields: [
        ...this.props.booleanFields,
        {
          value: '',
          field: this.props.fields[0].uid,
          booleanType: 0
        }
      ]
    })
    */
  }

  handleRemoveField({ removeIndex }) {
    /*
    const fields = this.state.booleanFields.filter((field, index) => removeIndex !== index)

    this.setState({
      booleanFields: fields
    })
    */
  }

  handleSubmit(event) {
    event.preventDefault()
    /*

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

        const url = `/${activeDatastore.slug}?${queryString}`

        history.push(url)
      }
    }
    */
  }

  handleAdvancedFieldQueryChange({ index, value }) {
    this.props.setAdvancedField({
      datastoreUid: this.props.datastores.active,
      advancedFieldIndex: index,
      query: value
    })

    /*
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
    */
  }

  handleOnBooleanSwitchChange({ fieldIndex, switchOptionIndex }) {
    /*
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
    */
  }

  handleOnFieldChange({ fieldIndex, optionValue }) {
    /*
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
    */
  }

  render() {
    const { datastores, fields, match, advancedFields } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <div className="container container-narrow">
        <form onSubmit={this.handleSubmit} className="advanced-search-form">
          <div className="advanced-header">
            <h1 className="advanced-heading">{activeDatastore.name} Advanced Search</h1>
            <Link to={`${match.url.replace(/([\/]advanced[\/]?)/g, "")}${this.props.searchQueryFromURL}`} className="advanced-to-basic-link">Back to Basic Search</Link>
          </div>
          <div className="advanced-field-container">
            {advancedFields.map((field, index) => (
              <FieldInput
                key={index}
                index={index}
                field={field}
                fields={fields}
                handleAdvancedFieldQueryChange={this.handleAdvancedFieldQueryChange}
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
  handleAdvancedFieldQueryChange,
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
        labelText={`Selected field ${index + 1}`}
        options={fields}
        fieldIndex={index}
        handleOnFieldChange={handleOnFieldChange}
      />
      <input
        type="text"
        className="advanced-input"
        placeholder={`Search Term ${index + 1}`}
        value={field.value}
        aria-label={`Search Term ${index + 1}`}
        onChange={(event) => handleAdvancedFieldQueryChange({ index, value: event.target.value })}
      />
      {index > 0 ? (
        <button
          className="advanced-input-remove-button"
          type="button"
          onClick={handleRemoveField}>
            <Icon name="close"/><span className="offpage">Remove Field {index + 1}</span>
        </button>
      ) : null}
    </div>
  </fieldset>
)

const Dropdown = ({
  labelText,
  fieldIndex,
  options,
  selectedOption,
  handleOnFieldChange,
  multiple
}) => (
  <select
    aria-label={labelText ? labelText : 'dropdown'}
    className="dropdown advanced-field-select"
    value={selectedOption}
    multiple={multiple ? multiple : false}
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
  return {
    datastores: state.datastores,
    booleanTypes: state.search.advanced.booleanTypes,
    advancedFields: state.search.advanced[state.datastores.active].advancedFields,
    fields: state.search.advanced[state.datastores.active].fields,
    filters: state.search.advanced[state.datastores.active].filters,
    searchQuery: state.search.query
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeAdvancedField,
    setAdvancedField
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
)
