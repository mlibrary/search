/** @jsx jsx */
import { jsx } from '@emotion/core'

import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'
import numeral from 'numeral'
import {
  withRouter
} from 'react-router-dom'
import qs from 'qs'
import {
  ShowAllChildren,
  Checkbox,
} from '../../../core'
import {
  LINK_STYLES,
  SPACING,
  Button,
  COLORS,
  Icon
} from '@umich-lib/core'
import {
  getDisplayFilters,
  getFilterItems,
  getOpenFilterDefaults,
  filtersWithOpenProperty,
  getActiveFilters,
  isFilterItemChecked,
  isFilterItemActive,
  getCheckboxOnClickValue,
  createActiveFilterObj,
  getSingleSelectedFilterValue
} from '../../utilities'
import ReactGA from 'react-ga'

class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: getOpenFilterDefaults()
    }

    this.handleFilterClick = this.handleFilterClick.bind(this)
    this.handleFilterItemClick = this.handleFilterItemClick.bind(this)
    this.handleClearActiveFilters = this.handleClearActiveFilters.bind(this)
  }
  openFilter({ datastoreUid, filterUid }) {
    const open = this.state.open;
    this.setState({
      open: {
        ...open,
        [datastoreUid]: open[datastoreUid].concat(filterUid)
      }
    })
  }
  closeFilter({ datastoreUid, filterUid }) {
    const open = this.state.open;
    this.setState({
      open: {
        ...open,
        [datastoreUid]: _.filter(open[datastoreUid], filter => filter !== filterUid)
      }
    })
  }
  handleFilterClick({ datastoreUid, filterUid }) {
    const { open } = this.state
    const isOpen = _.contains(open[datastoreUid], filterUid)

    if (isOpen) {
      this.closeFilter({ datastoreUid, filterUid })
    } else {
      this.openFilter({ datastoreUid, filterUid })
    }
  }
  handleFilterItemClick({
    datastoreUid,
    filterUid,
    filterType,
    filterItemValue
  }) {
    const { history, match, query, sort, institution } = this.props
    const isActive = isFilterItemActive({
      datastoreUid,
      filterUid,
      filterItemValue
    })

    const filterObj = createActiveFilterObj({
      addActiveFilter: !isActive,
      activeFilters: this.props.activeFilters,
      filterUid,
      filterType,
      filterItemValue,
    })

    // If applying filter, send event to GA
    if (!isActive) {
      ReactGA.event({
        action: 'Click',
        category: 'Filter',
        label: `${datastoreUid}: ${filterUid} Apply ${filterItemValue}`
      })
    }

    const library = datastoreUid === 'mirlyn' ? institution.active : undefined

    const queryString = qs.stringify({
      query,
      filter: filterObj,
      sort,
      library
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format : 'RFC1738'
    })

    if (queryString.length > 0) {
      history.push(`${match.url}?${queryString}`)
    } else {
      history.push(match.url)
    }
  }
  handleClearActiveFilters({ datastoreUid }) {
    let query = undefined

    if (this.props.query && this.props.query.length > 0) {
      query = this.props.query
    }

    const queryString = qs.stringify({
      query: query
    }, {
      arrayFormat: 'repeat',
      encodeValuesOnly: true,
      allowDots: true,
      format : 'RFC1738'
    })

    const { history, match } = this.props
    const url = `${match.url}?${queryString}`

    history.push(url)
  }
  render() {
    const { datastoreUid, filters, activeFilters, defaults } = this.props
    const open = this.state.open[datastoreUid]
    const displayActiveFilters = getActiveFilters({
      datastoreUid,
      activeFilters,
      filters,
      defaults
    })
    const displayFilters = filtersWithOpenProperty({ open, filters })

    return (
      <div className="filters-container">
        <ActiveFilters
          datastoreUid={datastoreUid}
          activeFilters={displayActiveFilters}
          handleFilterItemClick={this.handleFilterItemClick}
          handleClearActiveFilters={this.handleClearActiveFilters}
        />
        <FilterList
          open={open}
          datastoreUid={datastoreUid}
          filters={displayFilters}
          handleFilterClick={this.handleFilterClick}
          handleFilterItemClick={this.handleFilterItemClick}
          handleShowClick={this.handleShowClick}
          activeFilters={activeFilters}
        />
      </div>
    )
  }
}

const FilterList = ({
  open,
  datastoreUid,
  filters,
  handleFilterClick,
  handleFilterItemClick,
  handleShowClick,
  activeFilters
}) => {
  if (filters.length > 0) {
    return (
      <div>
        <h2 css={{ fontWeight: '700', padding: `${SPACING['M']} 0` }}>Filter your search</h2>
        <ul className="filter-group-list">
          {filters.map((filter, index) => (
            <Filter
              key={index}
              datastoreUid={datastoreUid}
              filter={filter}
              handleFilterClick={handleFilterClick}
              handleFilterItemClick={handleFilterItemClick}
              handleShowClick={handleShowClick}
              filters={filters}
              activeFilters={activeFilters}
            />
          ))}
        </ul>
      </div>
    )
  }

  return null
}

const SingleSelect = ({
  labelText,
  options,
  selectedOption,
  handleChange
}) => (
  <select
    aria-label={labelText ? labelText : 'dropdown'}
    className="dropdown"
    value={selectedOption}
    onChange={handleChange}
  >
    {options.map((option, index) =>
      <option value={option.value} key={index}>{option.name}</option>
    )}
  </select>
)

const Filter = ({
  datastoreUid,
  filter,
  handleFilterClick,
  handleFilterItemClick,
  activeFilters,
  filters
}) => {
  switch (filter.type) {
    case 'checkbox':
      const isChecked = isFilterItemChecked({
        datastoreUid,
        filterUid: filter.uid,
        activeFilters,
        filters
      })
      const value = getCheckboxOnClickValue({
        datastoreUid,
        filterUid: filter.uid,
      })

      return (
        <li css={{
          '> label': {
            padding: `${SPACING['2XS']} 0`
          }
        }}>
          <Checkbox
            handleClick={() => handleFilterItemClick({
              datastoreUid,
              filterUid: filter.uid,
              filterItemValue: value
            })}
            isChecked={isChecked}
            label={filter.name}
          />
        </li>
      )
    case 'singleselect':
      return (
        <li className="filter-group filter-group-checkbox">
          <div>
            <SingleSelect
              labelText={filter.name}
              options={filter.filters}
              selectedOption={getSingleSelectedFilterValue({
                filter,
                activeFilters
              })}
              handleChange={(event) => handleFilterItemClick({
                datastoreUid,
                filterUid: filter.uid,
                filterType: filter.type,
                filterItemValue: event.target.value
              })}
            />
          </div>
        </li>
      )
    case 'multiselect':
      const filterItems = getFilterItems({
        datastoreUid: datastoreUid,
        filterUid: filter.uid,
        items: filter.filters
      })

      if (filterItems.length === 0) {
        return null
      }

      return (
        <li css={{
          borderTop: `solid 1px ${COLORS.neutral[100]}`
        }}>
          <button
            css={{
              width: '100%',
              padding: `${SPACING['M']} 0`
            }}
            aria-expanded={filter.open}
            onClick={() => handleFilterClick({
              datastoreUid: datastoreUid,
              filterUid: filter.uid
            })}
          >
            <span css={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 css={{
                fontWeight: '700'
              }}>
                {filter.name}
              </h3>
              {filter.open
                ? <Icon icon="expand_less" size="24" />
                : <Icon icon="expand_more" size="24" />
              }
            </span>
          </button>
          {filter.open && (
            <div css={{
              marginBottom: SPACING['L']
            }}>
              <ul className="filter-list">
                <ShowAllChildren
                  length={filterItems.length}
                  show={5}
                  name={`${filter.name} Filters`}>
                    {filterItems.map((filterItem, index) => (
                      <FilterItem
                        key={index}
                        filter={filterItem}
                        handleFilterItemClick={() => handleFilterItemClick({
                          datastoreUid,
                          filterUid: filter.uid,
                          filterItemValue: filterItem.value
                        })}
                      />
                    ))}
                </ShowAllChildren>
              </ul>
            </div>
          )}
        </li>
      )
    default:
      return null
  }
}

const FilterItem = ({
  filter,
  handleFilterItemClick
}) => {
  return (
    <li className="filter-item">
      <button
        onClick={handleFilterItemClick}
        css={{
          display: 'block',
          width: '100%',
          padding: `${SPACING['XS']} 0`,
          '.filter-value-text': {
            ...LINK_STYLES['default'],
            ':hover': {}
          },
          ':hover .filter-value-text': {
            ...LINK_STYLES['default'][':hover']
          }
        }}
      >
        <span css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          <span className="filter-value" css={{ textAlign: 'left' }}><span className="filter-value-text">{filter.name}</span></span>

          {filter.count ? (
            <span className="filter-count">{numeral(filter.count).format(0,0)}</span>
          ) : null}
        </span>
      </button>
    </li>
  )
}

const ActiveFilters = ({
  datastoreUid,
  activeFilters,
  handleFilterItemClick,
  handleClearActiveFilters
}) => {
  return (
    <div>
      <h2 css={{
        fontWeight: '700',
        marginBottom: SPACING['S']
      }}>Current filters</h2>

      {activeFilters.length > 0 ? (
        <React.Fragment>
          <ul>
            {activeFilters.map((activeFilter, index) => (
              <li key={index}>
                <button
                  css={{
                    display: 'block',
                    width: '100%',
                    marginBottom: SPACING['S']
                  }}
                  onClick={
                    () => handleFilterItemClick({
                      datastoreUid: datastoreUid,
                      filterUid: activeFilter.uid,
                      filterItemValue: activeFilter.value,
                    })
                  }>
                  <span 
                    css={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: `${SPACING['S']} ${SPACING['M']}`,
                      background: COLORS.green['100'],
                      border: `solid 1px ${COLORS.green['200']}`,
                      borderRadius: '2px',
                      color: COLORS.green['500']
                    }}
                  >
                    <span css={{
                      textAlign: 'left'
                    }}>
                      {activeFilter.name}: {activeFilter.value}
                    </span>
                    <Icon icon="close" size="20" /><span className="offpage">Remove</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div>
            <Button
              small
              onClick={
               () => handleClearActiveFilters({ datastoreUid })
              }
              data-ga-action="Click"
              data-ga-category="Filter"
              data-ga-label={`Clear All Filters`}
            >Clear filters</Button>
          </div>
        </React.Fragment>
      ) : (
        <p>You have no filters applied.</p>
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    datastoreUid: state.datastores.active,
    query: state.search.query,
    sort: state.search.sort[state.datastores.active],
    filters: getDisplayFilters({
      filters: state.filters.groups,
      datastoreUid: state.datastores.active,
      searching: state.search.searching
    }),
    activeFilters: state.filters.active[state.datastores.active],
    institution: state.institution
  }
}

export default withRouter(
  connect(mapStateToProps)(Filters)
);
