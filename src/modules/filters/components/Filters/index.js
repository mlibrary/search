import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'
import numeral from 'numeral'

import {
  Icon,
  ShowAllList
} from '../../../core'
import { store } from '../../../../store'
import {
  clearActiveFilters,
  addActiveFilter,
  removeActiveFilter,
} from '../../actions'
import {
  runSearchPride,
} from '../../../../pride-interface';
import {
  getDisplayFilters,
  getFilterItems,
  getOpenFilterDefaults,
  filtersWithOpenProperty,
  isFilterItemActive,
  getActiveFilters,
  isFilterItemChecked
} from '../../utilities'

class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
       open: getOpenFilterDefaults()
    }

    this.handleFilterClick = this.handleFilterClick.bind(this)
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
      filterName,
      filterItemValue
    }) {
    const isActive = isFilterItemActive({ datastoreUid, filterUid, filterItemValue })

    if (isActive) {
      store.dispatch(removeActiveFilter({
        datastoreUid: datastoreUid,
        filterUid: filterUid,
        filterItemValue: filterItemValue,
      }))
    } else {
      store.dispatch(addActiveFilter({
        datastoreUid: datastoreUid,
        filterUid: filterUid,
        filterName: filterName,
        filterItemValue: filterItemValue
      }))
    }

    runSearchPride()
  }
  handleClearActiveFilters({ datastoreUid }) {
    store.dispatch(clearActiveFilters({ datastoreUid }))
    runSearchPride()
  }
  render() {
    const { datastoreUid, filters, activeFilters } = this.props
    const open = this.state.open[datastoreUid]
    return (
      <div className="filters-container">
        <ActiveFilters
          datastoreUid={datastoreUid}
          activeFilters={getActiveFilters({ activeFilters, filters })}
          handleFilterItemClick={this.handleFilterItemClick}
          handleClearActiveFilters={this.handleClearActiveFilters}
        />
        {filters.length === 0 ? (
          <NoFilters />
        ) : (
          <FilterList
            open={open}
            datastoreUid={datastoreUid}
            filters={filtersWithOpenProperty({ open, filters })}
            handleFilterClick={this.handleFilterClick}
            handleFilterItemClick={this.handleFilterItemClick}
            handleShowClick={this.handleShowClick}
          />
        )}
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
}) => (
  <div>
    <h2 className="filters-heading">Filter your search</h2>
    <ul className="filter-group-list">
      {filters.map(filter => (
        <Filter
          key={filter.uid}
          datastoreUid={datastoreUid}
          filter={filter}
          handleFilterClick={handleFilterClick}
          handleFilterItemClick={handleFilterItemClick}
          handleShowClick={handleShowClick}
        />
      ))}
    </ul>
  </div>
)

const Filter = ({
  datastoreUid,
  filter,
  handleFilterClick,
  handleFilterItemClick,
}) => {
  switch (filter.type) {
    case 'checkbox':
      const isChecked = isFilterItemChecked({
        datastoreUid,
        filterUid: filter.uid
      })
      const keys = Object.keys(filter.filters)
      const value = filter.filters[keys[0]].value

      return (
        <li className="filter-group filter-group-checkbox">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              className="filter-checkbox"
              checked={isChecked}
              onChange={() => handleFilterItemClick({
                datastoreUid,
                filterUid: filter.uid,
                filterItemValue: value
              })}
            />
            <span className="filter-name">{filter.name}</span>
          </label>
        </li>
      )
    case 'multiselect':
      const filterItems = getFilterItems({
        datastoreUid: datastoreUid,
        filterUid: filter.uid,
        items: filter.filters
      })

      return (
        <li className="filter-group filter-group-multiselect">
          <button
            className="filter-group-toggle-show-button"
            onClick={() => handleFilterClick({
              datastoreUid: datastoreUid,
              filterUid: filter.uid
            })}
          >
            <h3 className="filter-group-heading">
              {filter.name}
            </h3>
            {filter.open ? <Icon name="minus" /> : <Icon name="chevron-down" /> }
          </button>
          {filter.open && (
            <div className="filter-list-container">
              <ShowAllList length={filterItems.length} show={5} listClass={'filter-list'}>
                {filterItems.map((filterItem, index) => (
                  <FilterItem
                    key={index}
                    filter={filterItem}
                    handleFilterItemClick={() => handleFilterItemClick({
                      datastoreUid,
                      filterUid: filter.uid,
                      filterName: filter.name,
                      filterItemValue: filterItem.value
                    })}
                  />
                ))}
              </ShowAllList>
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
        className="filter-button"
        onClick={handleFilterItemClick}
      >
        <span className="filter-value">{filter.name}</span>
        <span className="filter-count">{numeral(filter.count).format(0,0)}</span>
      </button>
    </li>
  )
}

const NoFilters = () => (
  <div className="filters-container">
    <p className="no-filters-available"><b>No filters</b> available.</p>
  </div>
)

const ActiveFilters = ({
  datastoreUid,
  activeFilters,
  handleFilterItemClick,
  handleClearActiveFilters
}) => {
  if (activeFilters.length > 0) {
    return (
      <div className="active-filters-container">
        <h2 className="active-filters-heading">Current Filters</h2>
        <ul className="active-filters-list">
          {activeFilters.map((activeFilter, index) => (
            <li key={index} className="active-filter-item">
              <button
                className="active-filter-button"
                onClick={
                  () => handleFilterItemClick({
                    datastoreUid: datastoreUid,
                    filterUid: activeFilter.uid,
                    filterItemValue: activeFilter.value,
                  })
                }>
                <span className="active-filter-button-text">
                  {activeFilter.name}: {activeFilter.value}
                </span>
                <Icon name="close" />
              </button>
            </li>
          ))}
        </ul>
        <div className="clear-active-filters-container">
          <button className="button-link-light" onClick={
             () => handleClearActiveFilters({ datastoreUid })
          }>Clear filters</button>
        </div>
      </div>
    )
  }

  return null
}

function mapStateToProps(state) {
  return {
    datastoreUid: state.datastores.active,
    filters: getDisplayFilters({
      filters: state.filters.groups,
      datastoreUid: state.datastores.active
    }),
    activeFilters: state.filters.active[state.datastores.active]
  }
}

export default connect(mapStateToProps)(Filters);
