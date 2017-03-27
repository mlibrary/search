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

class Filters extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showGroups: []
    }

    // This binding is necessary to make `this` work in the callback
    this.handleRemoveFilterClick = this.handleRemoveFilterClick.bind(this)
    this.handleClearFilters = this.handleClearFilters.bind(this)
  }

  handleFilterGroupClick(filterGroup) {
    const groups = this.state.showGroups

    if (_.contains(groups, filterGroup)) {
      this.setState({
        showGroups: groups.filter((fg => fg !== filterGroup))
      })
    } else {
      this.setState({
        showGroups: groups.concat(filterGroup)
      })
    }
  }

  handleAddFilterClick({ activeDatastoreUid, group, filter }) {
    store.dispatch(addActiveFilter({ activeDatastoreUid, group, filter }))
  }

  handleRemoveFilterClick({ activeDatastoreUid, group }) {
    store.dispatch(removeActiveFilter({ activeDatastoreUid, group }))
  }

  handleClearFilters({ activeDatastoreUid }) {
    store.dispatch(clearActiveFilters({ activeDatastoreUid }))
  }

  render() {
    const { filters, activeDatastoreUid } = this.props;

    if (Object.keys(filters.groups).length === 0) {
      return (
        <div className="filters-container">
          <p className="no-filters-available"><b>No filters</b> available.</p>
        </div>
      )
    }

    //<pre>{JSON.stringify(this.state, null, 2)}</pre>

    return (
      <div className="filters-container">
        <ActiveFilters
          activeDatastoreUid={activeDatastoreUid}
          activeFilters={filters.active[activeDatastoreUid]}
          filters={filters}
          handleRemoveFilterClick={this.handleRemoveFilterClick}
          handleClearFilters={this.handleClearFilters}
        />
        <h2 className="filters-heading">Filter your search</h2>
        <ul className="filter-group-list">
          {_.map(filters.groups, filterGroup => {
            const filtersSorted = _.sortBy(filterGroup.filters, 'count').reverse().splice(0,10);
            const filterGroupUid = `${activeDatastoreUid}-${filterGroup.uid}`
            const showGroupFilters = _.contains(this.state.showGroups, (filterGroupUid))
            const activeFilters = filters.active[activeDatastoreUid]
            const showGroup = (!activeFilters || (activeFilters && !activeFilters[filterGroup.uid]))

            if (!showGroup) {
              return null
            }

            return (
              <li className="filter-group" key={filterGroupUid}>
                <button className="filter-group-toggle-show-button" onClick={() =>
                  this.handleFilterGroupClick(filterGroupUid)
                }>
                  <h3 className="filter-group-heading">{filterGroup.name}</h3>
                  {showGroupFilters ? <Icon name="minus" /> : <Icon name="chevron-down" /> }
                </button>
                {showGroupFilters && (
                  <ul className="filter-list">
                    {_.map(filtersSorted, filter => {
                      return (
                        <li className='filter-item' key={`${filterGroupUid}-${filter.name}`}>
                          <button className="filter-button" onClick={
                            () => this.handleAddFilterClick({
                              activeDatastoreUid,
                              group: filterGroup,
                              filter: filter,
                            })
                          }>
                            <span className="filter-value">{filter.value}</span>
                            <span className="filter-count">{numeral(filter.count).format(0,0)}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const ActiveFilters = ({
  activeDatastoreUid,
  handleRemoveFilterClick,
  activeFilters,
  filters,
  handleClearFilters
}) => {
  if (!activeFilters || !filters) {
    return null
  }

  const activeFilterGroups = Object.keys(activeFilters)
  if (activeFilterGroups.length === 0) {
    return null
  }

  console.log('activeFilterGroups', activeFilterGroups)

  return (
    <div className="active-filters-container">
      <h2 className="active-filters-heading">Current Filters</h2>
      <ul className="active-filters-list">
        {_.map(activeFilterGroups, activeFilterGroupUid => {
          const key = `${activeFilterGroupUid}-${activeFilters[activeFilterGroupUid]}`

          if (!filters.groups[activeFilterGroupUid]) {
            return null
          }

          return (
            <li className="active-filter-item" key={key}>
              <button className="active-filter-button" onClick={
                () => handleRemoveFilterClick({
                  activeDatastoreUid: activeDatastoreUid,
                  group: activeFilterGroupUid,
                })
              }>
                <span className="active-filter-button-text">{filters.groups[activeFilterGroupUid].name}: {activeFilters[activeFilterGroupUid]}</span>
                <Icon name="close" />
              </button>
            </li>
          )
        })}
      </ul>
      <div className="clear-active-filters-container">
        <button className="clear-active-filters-button button-link" onClick={
          () => handleClearFilters({ activeDatastoreUid })
        }>Clear filters</button>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    filters: state.filters,
    activeDatastoreUid: state.datastores.active,
  }
}

export default connect(mapStateToProps)(Filters);
