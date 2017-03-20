import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import numeral from 'numeral'

import { Icon } from '../../../core';
import {
  addQuery,
  removeQuery,
} from '../../../../router';

class Filters extends React.Component {
  state = {
    showGroups: [],
    activeFilters: Object.assign({}, this.props.filters.active)
  }

  handleFilterGroupClick(filterGroup) {
    const groups = this.state.showGroups
    const activeFilters = this.props.filters.active;

    if (groups.includes(filterGroup)) {
      this.setState({
        showGroups: groups.filter((fg => fg !== filterGroup))
      })
    } else {
      this.setState({
        showGroups: groups.concat(filterGroup)
      })
    }
  }

  handleFilterClick({ activeDatastoreUid, groupUid, filterName }) {
    this.setState({
      ...this.state,
      activeFilters: {
        ...this.state.activeFilters,
        [activeDatastoreUid]: {
          ...this.state.activeFilters[activeDatastoreUid],
          [groupUid]: filterName
        }
      }
    })


  }

  render() {
    const { filters, activeDatastoreUid } = this.props;

    if (Object.keys(filters.groups).length === 0) {
      return (
      <div className="filters-container">
        <h2 className="filters-heading">Filter your search</h2>
        <p className="no-filters-available"><b>No filters</b> available.</p>
      </div>
      )
    }

    //<pre>{JSON.stringify(this.state, null, 2)}</pre>

    return (
      <div className="filters-container">
        <ActiveFilters activeFilters={filters.active} />
        <h2 className="filters-heading">Filter your search</h2>
        <ul className="filter-group-list">
          {_.map(filters.groups, filterGroup => {
            const filtersSorted = _.sortBy(filterGroup.filters, 'count').reverse().splice(0,10);
            const filterGroupUid = `${activeDatastoreUid}-${filterGroup.uid}`
            const showGroupFilters = this.state.showGroups.includes(filterGroupUid)
            const activeFilters = this.state.activeFilters[activeDatastoreUid]
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
                            () => this.handleFilterClick({
                              activeDatastoreUid,
                              groupUid: filterGroup.uid,
                              filterName: filter.name,
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

const ActiveFilters = ({ activeFilters }) => {
  if (!activeFilters) {
    return null
  }

  return (
    <div>
      <h2>Current Filters</h2>
      <p>Placeholder</p>
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
