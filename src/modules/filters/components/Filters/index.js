import React from 'react'
import { connect } from 'react-redux'
import { _ } from 'underscore'
import numeral from 'numeral'

import { Icon } from '../../../core'
import { store } from '../../../../store'
import {
  clearActiveFilters,
  addActiveFilter,
  removeActiveFilter,
} from '../../actions'
import {
  runSearchPride,
  config
} from '../../../../pride-interface';

import {
  getDisplayFilters,
  filterItems,
  getFilterItems,
  isFilterGroupOpen,
  getOpenFilterDefaults,
  filtersWithOpenProperty
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
  handleFilterItemClick() {
    console.log('handleFilterItemClick')
  }
  handleShowClick() {
    console.log('handleShowClick')
  }
  render() {
    const { datastoreUid, filters } = this.props
    const open = this.state.open[datastoreUid]

    if (filters.length === 0) {
      return <NoFilters />
    }

    return (
      <FilterList
        open={open}
        datastoreUid={datastoreUid}
        filters={filtersWithOpenProperty({ open, filters })}
        handleFilterClick={this.handleFilterClick}
        handleFilterItemClick={this.handleFilterItemClick}
        handleShowClick={this.handleShowClick}
      />
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
  <div className="filters-container">
    <pre>{JSON.stringify(open, null, 2)}</pre>
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
      return (
        <li className="filter-group filter-group-checkbox">
          <label
            className="filter-checkbox-label"
            onClick={() => handleFilterItemClick()}
          >
            <input type="checkbox" />
            {filter.name}
          </label>
        </li>
      )
    case 'multiselect':
      const filterItems = getFilterItems({
        items: filter.filters
      })

      return (
        <li className="filter-group">
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
            <ul className="filter-list">
              {filterItems.map((filter, index) => (
                <FilterItem
                  key={index}
                  filter={filter}
                  handleFilterItemClick={handleFilterItemClick}
                />
              ))}
            </ul>
          )}
        </li>
      )
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
        onClick={() => handleFilterItemClick()}
      >
        <span className="filter-value">{filter.name}</span>
        <span className="filter-count">{filter.count}</span>
      </button>
    </li>
  )
}

const NoFilters = ({}) => (
  <div className="filters-container">
    <p className="no-filters-available"><b>No filters</b> available.</p>
  </div>
)

function mapStateToProps(state) {
  return {
    datastoreUid: state.datastores.active,
    filters: getDisplayFilters({
      filters: state.filters.groups,
      datastoreUid: state.datastores.active
    })
  }
}

export default connect(mapStateToProps)(Filters);
