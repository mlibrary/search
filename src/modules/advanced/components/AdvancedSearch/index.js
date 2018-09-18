import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { _ } from 'underscore';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import store from '../../../../store'

import {
  Icon,
  Multiselect,
  DateRangeInput,
  MultipleChoice,
  Checkbox,
  ScopeDown
} from '../../../core'

import {
  Breadcrumb
} from '../../../reusable'

import {
  stringifySearchQueryForURL,
} from '../../../pride'

import {
  addFieldedSearch,
  removeFieldedSearch,
  setFieldedSearch,
  setAdvancedFilter,
} from '../../../advanced'
import {
  setA11yMessage,
  setDocumentTitle
} from '../../../a11y'


class AdvancedSearch extends React.Component {
  constructor(props) {
    super(props)

    this.handleFieldedSearchChange = this.handleFieldedSearchChange.bind(this)
    this.handleAdvancedFilterChange = this.handleAdvancedFilterChange.bind(this)
    this.renderAdvancedFilters = this.renderAdvancedFilters.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    const { datastores } = this.props
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    setDocumentTitle([`${activeDatastore.name} Advanced Search`])
  }

  handleAddAnotherFieldedSearch() {
    this.props.addFieldedSearch({
      datastoreUid: this.props.datastores.active
    })

    this.props.setA11yMessage('Fielded search added.')
  }

  handleRemoveFieldedSearch({ removeIndex }) {
    this.props.removeFieldedSearch({
      datastoreUid: this.props.datastores.active,
      removeIndex
    })

    this.props.setA11yMessage('Fielded search removed.')
  }

  handleSubmit(event) {
    event.preventDefault()

    const {
      fieldedSearches,
      booleanTypes,
      activeFilters,
      institution,
      datastores
    } = this.props

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

    let filter = activeFilters

    // Submit search if query or filters are active
    if ((query.length > 0) || hasActiveFilters ){
      const { history } = this.props
      const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })
      const library = activeDatastore.uid === 'mirlyn' ? institution.active : undefined
      const queryString = stringifySearchQueryForURL({
        query,
        filter,
        library
      })

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
      case 'scope_down':
        // Clear active filters
        if (filterGroupUid === 'institution' && filterValue) {
          this.props.setAdvancedFilter({
            datastoreUid: this.props.datastores.active,
            filterType,
            filterGroupUid: 'collection',
            filterValue: undefined,
            onlyOneFilterValue: true
          })

          this.props.setAdvancedFilter({
            datastoreUid: this.props.datastores.active,
            filterType,
            filterGroupUid: 'location',
            filterValue: undefined,
            onlyOneFilterValue: true
          })
        }

        // Clear active filters
        if (filterGroupUid === 'location' && filterValue) {
          this.props.setAdvancedFilter({
            datastoreUid: this.props.datastores.active,
            filterType,
            filterGroupUid: 'collection',
            filterValue: undefined,
            onlyOneFilterValue: true
          })
        }

        this.props.setAdvancedFilter({
          datastoreUid: this.props.datastores.active,
          filterType,
          filterGroupUid,
          filterValue,
          onlyOneFilterValue: true
        })
        break
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
          <div className="u-margin-top-1">
            <Breadcrumb
              items={[
                {text: `${activeDatastore.name}`, to: `/${activeDatastore.slug}${document.location.search}` },
                {text: 'Advanced Search' }
              ]}
              renderAnchor={(item) => <Link to={item.to}>{item.text}</Link>}
            />
          </div>
          <div className="advanced-header">
            <h1 className="advanced-heading">{activeDatastore.name} Advanced Search</h1>
          </div>
          <div className="advanced-fields-container">
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
    if (filterValue.indexOf('before') !== -1) {
      const values = filterValue.split('before')

      return {
        stateSelectedRangeOption: 0,
        stateEndQuery: values[1]
      }
    }

    // After
    if (filterValue.indexOf('after') !== -1) {
      const values = filterValue.split('after')

      return {
        stateSelectedRangeOption: 1,
        stateBeginQuery: values[1]
      }
    }

    // Between
    if (filterValue.indexOf('to') !== -1) {
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
          handleChange={(option) => handleAdvancedFilterChange({
            filterType: advancedFilter.type,
            filterGroupUid: option.uid,
            filterValue: option.value
          })}
          options={advancedFilter.options}
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
          filterGroupUid={advancedFilter.uid}
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
      <MultipleChoice
        name={`search-field-${fieldedSearchIndex}-booleans`}
        heading={`Boolean operator for field ${fieldedSearchIndex} and field ${fieldedSearchIndex + 1}`}
        options={['AND', 'OR', 'NOT']}
        selectedIndex={fieldedSearch.booleanType}
        onMultipleChoiceChange={({ index }) => handleFieldedSearchChange({
          fieldedSearchIndex,
          booleanType: index
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
      <div className="advanced-input-remove-container">
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

const getCatalogNarrowSearchToOptions = (data, activeFilters, institution) => {
  this.getActiveFilter = ({ uid, defaultFilter, filters }) => {
    if (activeFilters && activeFilters[uid]) {
      return activeFilters[uid][0]
    }

    if (_.contains(filters, defaultFilter)) {
      return defaultFilter
    }

    return filters[0]
  }

  let options = []

  // Return three filters:
  //  - institution
  //  - location
  //  - collection

  // Any active filters?
  //   - no? Then use defaults
  //   - yes? Then scope accordingly

  const state = store.getState()

  // library aka institution
  const library = state.institution.active ? state.institution.active : state.institution.defaultInstitution // Get the site wide set institution to be used with the advanced search

  // institution
  const institutionData = _.findWhere(data.filters, { uid: 'institution' })
  const institutionFilters = institutionData.values.map(value => value.label)
  const institutionActiveFilter = this.getActiveFilter({
    uid: 'institution',
    defaultFilter: library,
    filters: institutionFilters
  })
  options = options.concat({
    uid: 'institution',
    label: institutionData.field,
    activeFilter: institutionActiveFilter ,
    filters: institutionFilters
  })

  // location
  const locationData = _.findWhere(institutionData.values, { label: institutionActiveFilter })
  const locationDefaultFilter = _.findWhere(data.defaults, { uid: 'location' })
  const locationFilters = locationData.values.map(value => value.label)
  const locationActiveFilter = this.getActiveFilter({
    uid: 'location',
    defaultFilter: locationDefaultFilter.value,
    filters: locationFilters
  })
  options = options.concat({
    uid: 'location',
    label: locationData.field,
    activeFilter: locationActiveFilter,
    filters: locationFilters
  })

  // collection
  const collectionData = _.findWhere(locationData.values, { label: locationActiveFilter })
  const collectionDefaultFilter = _.findWhere(data.defaults, { uid: 'collection' })
  const collectionFilters = collectionData.values.map(value => value.label)
  const collectionActiveFilter = this.getActiveFilter({
    uid: 'collection',
    defaultFilter: collectionDefaultFilter.value,
    filters: collectionFilters
  })
  options = options.concat({
    uid: 'collection',
    label: collectionData.field,
    activeFilter: collectionActiveFilter,
    filters: collectionFilters
  })

  // Example of what to return:

  /*
    [
      {
        uid: 'institution',
        label: 'Library',
        activeFilter: 'All libraries'
        filters: [
          'All libraries'
          'William L. Clements Library'
          // ...
        ]
      },
      {
        uid: 'location',
        // ...
      },
      {
        uid: 'collection',
        // ...
      }
    ]

  */

  return options
}

const getAdvancedFilters = ({ filterGroups, activeFilters }) => {
  if (!filterGroups) {
    return []
  }

  const advancedFilters = filterGroups.map(filterGroup => {

    // Special case for narrowing search...
    if (filterGroup.uid === 'narrow_search') {
      const options = getCatalogNarrowSearchToOptions(filterGroup, activeFilters)

      return {
        ...filterGroup,
        options
      }

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
    searchQuery: state.search.query,
    institution: state.institution
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addFieldedSearch,
    removeFieldedSearch,
    setFieldedSearch,
    setAdvancedFilter,
    setA11yMessage
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch)
)
