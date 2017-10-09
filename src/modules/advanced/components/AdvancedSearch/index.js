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
  Multiselect,
  DateRangeInput,
  Switch,
  Checkbox,
  ScopeDown
} from '../../../core'

import {
  stringifySearchQueryForURL,
} from '../../../pride'

import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch,
  setAdvancedFilter,
} from '../../../advanced'

class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.handleFieldedSearchChange = this.handleFieldedSearchChange.bind(this)
    this.handleAdvancedFilterChange = this.handleAdvancedFilterChange.bind(this)
    this.renderAdvancedFilters = this.renderAdvancedFilters.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleAddAnotherFieldedSearch() {
    this.props.addFieldedSearch({
      datastoreUid: this.props.datastores.active
    })
  }

  handleRemoveFieldedSearch({ removeIndex }) {
    this.props.removeFieldedSearch({
      datastoreUid: this.props.datastores.active,
      removeIndex
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const { fieldedSearches, booleanTypes, activeFilters } = this.props

    // Build the query
    // example output: 'title:parrots AND author:charles'
    const query = fieldedSearches.reduce((memo, fieldedSearch, index) => {
      if (fieldedSearch.query.length > 0) {
        if (index > 0) {
          memo.push(booleanTypes[fieldedSearch.booleanType])
        }

        memo.push(`${fieldedSearch.field}:${fieldedSearch.query}`)
      }

      return memo
    }, []).join(' ')

    let hasActiveFilters = false

    if (activeFilters && Object.keys(activeFilters).length > 0) {
      hasActiveFilters = true
    }

    // Submit search if query or filters are active
    if ((query.length > 0) || hasActiveFilters ){
      const { history } = this.props

      const queryString = stringifySearchQueryForURL({
        query,
        filter: activeFilters
      })

      const { datastores } = this.props;
      const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })
      const url = `/${activeDatastore.slug}?${queryString}`
      history.push(url)
    }
  }

  handleFieldedSearchChange({
    fieldedSearchIndex,
    selectedFieldUid,
    query,
    booleanType
  }) {
    this.props.setFieldedSearch({
      datastoreUid: this.props.datastores.active,
      fieldedSearchIndex,
      selectedFieldUid,
      query,
      booleanType,
    })
  }

  handleAdvancedFilterChange({
    filterType,
    filterGroupUid,
    filterValue
  }) {
    switch (filterType) {
      case 'checkbox':
        this.props.setAdvancedFilter({
          datastoreUid: this.props.datastores.active,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        })
        break
      case 'multiple_select':
        this.props.setAdvancedFilter({
          datastoreUid: this.props.datastores.active,
          filterGroupUid,
          filterValue
        })
        break
      case 'date_range_input':
        this.props.setAdvancedFilter({
          datastoreUid: this.props.datastores.active,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        })
        break
      default:
        break
    }
  }

  renderAdvancedFilters() {
    const { advancedFilters } = this.props
    const advancedFiltersGroups = Object.keys(advancedFilters)

    return (
      <div className="advanced-filters-container">
        {advancedFiltersGroups.map((filterGroup, groupIndex) => (
          <div className="container advanced-filters-inner-container" key={groupIndex}>
            {filterGroup !== 'undefined' ? (
              <div className="advanced-filter-container">
                <h2 className="advanced-filter-label-text">{filterGroup}</h2>
                <div className="advanced-filter-inner-container">
                  {advancedFilters[filterGroup].map((advancedFilter, index) => (
                    <AdvancedFilter
                      key={index}
                      advancedFilter={advancedFilter}
                      handleAdvancedFilterChange={this.handleAdvancedFilterChange} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="advanced-filters-inner-container">
                {advancedFilters[filterGroup].map((advancedFilter, index) => (
                  <div key={index} className="advanced-filter-container">
                    <h2 className="advanced-filter-label-text">{advancedFilter.name}</h2>
                    <div className="advanced-filter-inner-container">
                      <AdvancedFilter
                        advancedFilter={advancedFilter}
                        handleAdvancedFilterChange={this.handleAdvancedFilterChange} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  render() {
    const { datastores, fields, match, fieldedSearches } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    return (
      <form onSubmit={this.handleSubmit} className="advanced-search-form">
        <div className="container container-narrow">
          <div className="advanced-header">
            <h1 className="advanced-heading">Advanced Search: {activeDatastore.name}</h1>
            <Link to={`${match.url.replace(/([\/]advanced[\/]?)/g, "")}${this.props.searchQueryFromURL}`} className="advanced-to-basic-link">Back to Basic Search</Link>
          </div>
          <div className="advanced-field-container">
            {fieldedSearches.map((fieldedSearch, index) => (
              <FieldInput
                key={index}
                fieldedSearchIndex={index}
                fieldedSearch={fieldedSearch}
                fields={fields}
                handleFieldedSearchChange={this.handleFieldedSearchChange}
                handleRemoveFieldedSearch={() => this.handleRemoveFieldedSearch({ removeIndex: index})}
              />
            ))}
          </div>
          <div className="advanced-add-field-container">
            <button type="button" className="button-link-light" onClick={() => this.handleAddAnotherFieldedSearch()}>Add another field</button>
          </div>
        </div>

        {this.renderAdvancedFilters()}

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

const getStateDateRangeValues = ({ advancedFilter }) => {
  if (advancedFilter.activeFilters && advancedFilter.activeFilters.length > 0) {
    const filterValue = advancedFilter.activeFilters[0]

    // For splitting string into before, after, between, and in values

    // Before
    if (filterValue.includes('before')) {
      const values = filterValue.split('before')

      return {
        stateSelectedRangeOption: 0,
        stateEndQuery: values[1]
      }
    }

    // After
    if (filterValue.includes('after')) {
      const values = filterValue.split('after')

      return {
        stateSelectedRangeOption: 1,
        stateBeginQuery: values[1]
      }
    }

    // Between
    if (filterValue.includes('to')) {
      const values = filterValue.split('to')

      return {
        stateSelectedRangeOption: 2,
        stateBeginQuery: values[0],
        stateEndQuery: values[1]
      }
    }

    // In or other
    return {
      stateSelectedRangeOption: 3,
      stateBeginQuery: filterValue
    }
  }

  return {
    stateSelectedRangeOption: 0,
    stateBeginQuery: '',
    stateEndQuery: ''
  }
}

const getDateRangeValue = ({ beginDateQuery, endDateQuery, selectedRange }) => {
  switch (selectedRange) {
    case 'Before':
      if (!endDateQuery) {
        return undefined
      }
      return `before${endDateQuery}`
    case 'After':
      if (!beginDateQuery) {
        return undefined
      }
      return `after${beginDateQuery}`
    case 'Between':
      if (!beginDateQuery || !endDateQuery) {
        return undefined
      }
      return `${beginDateQuery}to${endDateQuery}`
    case 'In':
      if (!beginDateQuery) {
        return undefined
      }
      return beginDateQuery
    default:
      return undefined
  }
}

const getIsCheckboxFilterChecked = ({ advancedFilter }) => {
  const hasActiveFilter = advancedFilter.activeFilters && advancedFilter.activeFilters.length > 0

  if (!hasActiveFilter && advancedFilter.conditions.default === 'checked') {
    return true
  } else if (hasActiveFilter) {
    // Compare active filters to configured checked conditions
    if (advancedFilter.activeFilters[0] === advancedFilter.conditions.checked) {
      return true
    }
  }

  return false
}

const AdvancedFilter = ({
  advancedFilter,
  handleAdvancedFilterChange
}) => {

  switch (advancedFilter.type) {
    case 'scope_down':
      return (
        <ScopeDown
          handleClick={() => console.log('ScopeDown handleClick')}
          options={advancedFilter.filters}
        />
      )
    case 'checkbox':
      const isChecked = getIsCheckboxFilterChecked({ advancedFilter })
      const value = isChecked ? advancedFilter.conditions.unchecked : advancedFilter.conditions.checked

      return (
        <Checkbox
          handleClick={() => handleAdvancedFilterChange({
            filterType: advancedFilter.type,
            filterGroupUid: advancedFilter.uid,
            filterValue: value
          })}
          isChecked={isChecked}
          label={advancedFilter.name}
        />
      )
    case 'multiple_select':
      const options = advancedFilter.filters.map(option => {
        return {
          checked: option.isActive,
          value: option.value,
          name: option.value,
        }
      })

      return (
        <Multiselect
          options={options}
          handleSelection={(index, option) => handleAdvancedFilterChange({
            filterType: advancedFilter.type,
            filterGroupUid: advancedFilter.uid,
            filterValue: option.value
          })} />
      )
    case 'date_range_input':
      const { stateSelectedRangeOption, stateBeginQuery, stateEndQuery } = getStateDateRangeValues({ advancedFilter })

      return (
        <DateRangeInput
          selectedRangeOption={stateSelectedRangeOption}
          beginQuery={stateBeginQuery}
          endQuery={stateEndQuery}
          handleSelection={({ beginDateQuery, endDateQuery, selectedRange }) => handleAdvancedFilterChange({
            filterType: advancedFilter.type,
            filterGroupUid: advancedFilter.uid,
            filterValue: getDateRangeValue({ beginDateQuery, endDateQuery, selectedRange }),
          })} />
      )
    default:
      return null
  }
}

const FieldInput = ({
  fieldedSearchIndex,
  fieldedSearch,
  fields,
  handleFieldedSearchChange,
  handleRemoveFieldedSearch,
}) => (
  <fieldset style={{ margin: 0 }}>
    <legend className="offpage">Search field {fieldedSearchIndex + 1}</legend>
    {fieldedSearchIndex === 0 ? null : (
      <Switch
        options={['AND', 'OR', 'NOT']}
        selectedIndex={fieldedSearch.booleanType}
        onSwitchChange={({ switchIndex }) => handleFieldedSearchChange({
          fieldedSearchIndex,
          booleanType: switchIndex
        })}
      />
    )}
    <div className="advanced-input-container">
      <Dropdown
        labelText={`Selected field ${fieldedSearchIndex + 1}`}
        options={fields}
        selectedOption={fieldedSearch.field}
        fieldedSearchIndex={fieldedSearchIndex}
        handleOnFieldChange={handleFieldedSearchChange}
      />
      <input
        type="text"
        className="advanced-input"
        placeholder={`Search Term ${fieldedSearchIndex + 1}`}
        value={fieldedSearch.query}
        aria-label={`Search Term ${fieldedSearchIndex + 1}`}
        onChange={(event) => handleFieldedSearchChange({
          fieldedSearchIndex,
          query: event.target.value
        })}
      />
      {fieldedSearchIndex > 0 ? (
        <button
          className="advanced-input-remove-button"
          type="button"
          onClick={handleRemoveFieldedSearch}>
            <Icon name="close"/><span className="offpage">Remove Field {fieldedSearchIndex + 1}</span>
        </button>
      ) : null}
    </div>
  </fieldset>
)

const Dropdown = ({
  labelText,
  fieldedSearchIndex,
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
      fieldedSearchIndex,
      selectedFieldUid: event.target.value,
    })}
  >
    {options.map((option, index) =>
      <option value={option.uid} key={index}>{option.name}</option>
    )}
  </select>
)

const getAdvancedFilters = ({ filterGroups, activeFilters }) => {
  if (!filterGroups) {
    return []
  }

  const advancedFilters = filterGroups.map(filterGroup => {
    if (filterGroup.type === 'scope_down') {
      return filterGroup
    }

    return {
      ...filterGroup,
      filters: filterGroup.filters.map(filterValue => {
        let isActive = false

        if (activeFilters && activeFilters[filterGroup.uid]) {
          isActive = _.contains(activeFilters[filterGroup.uid], filterValue)
        }

        return {
          value: filterValue,
          isActive
        }
      }),
      activeFilters: activeFilters ? activeFilters[filterGroup.uid] : [],
    }
  })

  return _.groupBy(advancedFilters, 'groupBy')
}

function mapStateToProps(state) {
  const advancedFilters = getAdvancedFilters({
    filterGroups: state.advanced[state.datastores.active].filters,
    activeFilters: state.advanced[state.datastores.active].activeFilters,
  })

  return {
    datastores: state.datastores,
    booleanTypes: state.advanced.booleanTypes,
    fieldedSearches: state.advanced[state.datastores.active].fieldedSearches,
    fields: state.advanced[state.datastores.active].fields,
    advancedFilters,
    activeFilters: state.advanced[state.datastores.active].activeFilters,
    searchQuery: state.search.query
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addFieldedSearch,
    removeFieldedSearch,
    setFieldedSearch,
    setAdvancedFilter
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
)
