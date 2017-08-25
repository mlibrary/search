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
  Multiselect
} from '../../../core'

import {
  stringifySearchQueryForURL,
} from '../../../pride'


import {
  removeAdvancedField,
  setAdvancedField,
  addAdvancedField
} from '../../../advanced'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.handleAdvancedFieldChange = this.handleAdvancedFieldChange.bind(this)
    this.handleAdvancedFilterChange = this.handleAdvancedFilterChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddAnotherField() {
    this.props.addAdvancedField({
      datastoreUid: this.props.datastores.active,
      selectedFieldUid: this.props.fields[0].uid
    })
  }

  handleRemoveField({ removeIndex }) {
    this.props.removeAdvancedField({
      datastoreUid: this.props.datastores.active,
      removeIndex
    })
  }

  handleOptionSelection() {

  }

  handleSubmit(event) {
    event.preventDefault()

    const { advancedFields, booleanTypes } = this.props

    // Build the query
    // example output: 'title:parrots AND author:charles'
    const query = advancedFields.reduce((memo, field) => {
      if (field.query.length > 0) {
        if (typeof field.booleanType !== 'undefined') {
          memo.push(booleanTypes[field.booleanType])
        }

        memo.push(`${field.selectedFieldUid}:${field.query}`)
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
  }

  handleAdvancedFieldChange({
    advancedFieldIndex,
    selectedFieldUid,
    query,
    booleanType
  }) {
    this.props.setAdvancedField({
      datastoreUid: this.props.datastores.active,
      advancedFieldIndex,
      selectedFieldUid,
      query,
      booleanType,
    })
  }

  handleAdvancedFilterChange({
    index,
    option,
    advancedFilter
  }) {
    console.log('handleAdvancedFilterChange',
      index,
      option,
      advancedFilter)

    switch (advancedFilter.type) {
      case 'multiselect':
        // Option was changed. Updated the state accordingly.

      default:
        console.log('default')
    }
  }

  render() {
    const { datastores, fields, filters, match, advancedFields } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <form onSubmit={this.handleSubmit} className="advanced-search-form">
        <div className="container container-narrow">
          <div className="advanced-header">
            <h1 className="advanced-heading">Advanced Search: {activeDatastore.name}</h1>
            <Link to={`${match.url.replace(/([\/]advanced[\/]?)/g, "")}${this.props.searchQueryFromURL}`} className="advanced-to-basic-link">Back to Basic Search</Link>
          </div>
          <div className="advanced-field-container">
            {advancedFields.map((field, advancedFieldIndex) => (
              <FieldInput
                key={advancedFieldIndex}
                advancedFieldIndex={advancedFieldIndex}
                field={field}
                fields={fields}
                handleAdvancedFieldChange={this.handleAdvancedFieldChange}
                handleRemoveField={() => this.handleRemoveField({ removeIndex: advancedFieldIndex})}
              />
            ))}
          </div>
          <div className="advanced-add-field-container">
            <button type="button" className="button-link-light" onClick={() => this.handleAddAnotherField()}>Add another field</button>
          </div>
        </div>
        {filters && (
          <div className="advanced-filters-container">
            <div className="container advanced-filters-inner-container">
              {filters.map((advancedFilter, filterIndex) => (
                <div key={filterIndex} className="advanced-filter-container">
                  <h2 className="advanced-filter-label-text">{advancedFilter.name}</h2>
                  <AdvancedFilter
                    advancedFilter={advancedFilter}
                    handleAdvancedFilterChange={this.handleAdvancedFilterChange} />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="advanced-search-button-container">
          <div className="container container-narrow ">
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

const AdvancedFilter = ({
  advancedFilter,
  handleAdvancedFilterChange
}) => {
  switch (advancedFilter.type) {
    case 'multiselect':
      const options = advancedFilter.values.map(option => {
        return {
          checked: false,
          value: option,
          name: option,
        }
      })
      return <Multiselect
                options={options}
                handleSelection={(index, option) => handleAdvancedFilterChange({
                  index,
                  option,
                  advancedFilter
                })} />
    case 'select':
    default:
      return null
  }
}

const FieldInput = ({
  advancedFieldIndex,
  field,
  fields,
  handleRemoveField,
  handleAdvancedFieldChange,
}) => (
  <fieldset style={{ margin: 0 }}>
    <legend className="offpage">Search field {advancedFieldIndex + 1}</legend>
    {advancedFieldIndex === 0 ? null : (
      <Switch
        options={['AND', 'OR', 'NOT']}
        advancedFieldIndex={advancedFieldIndex}
        selectedIndex={field.booleanType}
        onSwitchChange={handleAdvancedFieldChange}
      />
    )}
    <div className="advanced-input-container">
      <Dropdown
        labelText={`Selected field ${advancedFieldIndex + 1}`}
        options={fields}
        selectedOption={field.selectedFieldUid}
        advancedFieldIndex={advancedFieldIndex}
        handleOnFieldChange={handleAdvancedFieldChange}
      />
      <input
        type="text"
        className="advanced-input"
        placeholder={`Search Term ${advancedFieldIndex + 1}`}
        value={field.query}
        aria-label={`Search Term ${advancedFieldIndex + 1}`}
        onChange={(event) => handleAdvancedFieldChange({
          advancedFieldIndex,
          query: event.target.value
        })}
      />
      {advancedFieldIndex > 0 ? (
        <button
          className="advanced-input-remove-button"
          type="button"
          onClick={handleRemoveField}>
            <Icon name="close"/><span className="offpage">Remove Field {advancedFieldIndex + 1}</span>
        </button>
      ) : null}
    </div>
  </fieldset>
)

const Dropdown = ({
  labelText,
  advancedFieldIndex,
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
      advancedFieldIndex,
      selectedFieldUid: event.target.value,
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
  advancedFieldIndex,
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
              advancedFieldIndex,
              booleanType: optionIndex,
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
    booleanTypes: state.advanced.booleanTypes,
    advancedFields: state.advanced[state.datastores.active].advancedFields,
    fields: state.advanced[state.datastores.active].fields,
    filters: state.advanced[state.datastores.active].filters,
    searchQuery: state.search.query
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeAdvancedField,
    setAdvancedField,
    addAdvancedField
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
)
