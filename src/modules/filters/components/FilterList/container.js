import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import {
  addQuery,
  removeQuery,
} from '../../../../router';

import FilterList from './presenter';

class FilterListContainer extends React.Component {
  constructor(props) {
    super(props);
    const activeFilters = props.filters.active;
    this.state = {activeFilters: Object.assign({}, activeFilters)};
    this.handleFilter = this.handleFilter.bind(this);
    this.addFilterToURL = this.addFilterToURL.bind(this);
 }

  handleFilter(e) {
    const activeFilters = Object.assign({}, this.state.activeFilters);
    const activeDatastore = this.props.activeDatastore;
    const { group, value } = e.target.dataset;
    let valueCheck = value;

    if (activeFilters[activeDatastore] && activeFilters[activeDatastore][group]) {
      delete activeFilters[activeDatastore][group]; //TODO refactor, should not mutate

      this.setState({
        activeFilters: activeFilters,
      }, this.addFilterToURL)
    } else {
      this.setState({
        activeFilters: {
          ...this.state.activeFilters,
          [activeDatastore]: {
            ...this.state.activeFilters[activeDatastore],
            [group]: valueCheck
          }
        },
      }, this.addFilterToURL)
    }
  }

  addFilterToURL() {
    const activeDatastore = this.props.activeDatastore;
    const activeFilters = Object.assign({}, this.state.activeFilters);
    const filterGroups = Object.keys(activeFilters[activeDatastore]);

    if (filterGroups.length > 0) {
      const query = filterGroups.reduce((memo, key) => {
        if (memo !== '') {
          memo += ';'
        }
        return memo + `${key}:${activeFilters[activeDatastore][key]}`
      }, '')

      addQuery({
        filter: query
      })
    } else {
      removeQuery('filter')
    }
  }

  getActiveFilters(activeDatastore, activeFilters, group) {
    if (!activeFilters[activeDatastore]) {
      return undefined;
    }

    return activeFilters[activeDatastore][group];
  }

  render() {
    const activeFilters = Object.assign({}, this.state.activeFilters);;
    const { filters, activeDatastore } = this.props;

    if (Object.keys(this.props.filters.groups).length === 0) {
      return <p className="alert no-border">No filters to display.</p>
    }

    return (
      <div className="filter-groups">
        {_.map(filters.groups, (group) => {
          const active = this.getActiveFilters(activeDatastore, activeFilters, group.uid)
          return (
            <FilterList
              group={group}
              handleFilter={this.handleFilter}
              key={group.uid}
              active={active} />
          )
        })}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    search: state.search,
    records: state.records,
    filters: state.filters,
    activeDatastore: state.datastores.active,
  };
}

export default connect(mapStateToProps)(FilterListContainer);
