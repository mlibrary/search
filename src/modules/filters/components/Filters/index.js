import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';
import numeral from 'numeral'

import { Icon } from '../../../core';

class Filters extends React.Component {
  state = {
    show: []
  }

  handleFilterGroupClick(filterGroup) {
    const groups = this.state.show

    if (groups.includes(filterGroup)) {
      this.setState({
        show: groups.filter((fg => fg !== filterGroup))
      })
    } else {
      this.setState({
        show: groups.concat(filterGroup)
      })
    }
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
        <h2 className="filters-heading">Filter your search</h2>
        <ul className="filter-group-list">
          {_.map(filters.groups, filterGroup => {
            const filtersSorted = _.sortBy(filterGroup.filters, 'count').reverse().splice(0,10);
            const filterGroupUid = `${activeDatastoreUid}-${filterGroup.uid}`
            const show = this.state.show.includes(filterGroupUid)
            return (
              <li className="filter-group" key={filterGroupUid}>
                <button className="filter-group-toggle-show-button" onClick={() =>
                  this.handleFilterGroupClick(filterGroupUid)
                }>
                  <h3 className="filter-group-heading">{filterGroup.name}</h3>
                  {show ? <Icon name="minus" /> : <Icon name="chevron-down" /> }
                </button>
                {show && (
                  <ul className="filter-list">
                    {_.map(filtersSorted, filter => (
                      <li className="filter-item" key={`${filterGroupUid}-${filter.name}`}>
                        <button className="filter-button">
                          <span className="filter-value">{filter.value}</span>
                          <span className="filter-count">{numeral(filter.count).format(0,0)}</span>
                        </button>
                      </li>
                    ))}
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

function mapStateToProps(state) {
  return {
    filters: state.filters,
    activeDatastoreUid: state.datastores.active,
  }
}

export default connect(mapStateToProps)(Filters);
