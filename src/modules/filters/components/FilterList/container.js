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

   this.state = {filters: Object.assign({}, props.filters.active)};
   this.handleFilter = this.handleFilter.bind(this);
   this.filterQuery = this.filterQuery.bind(this);
 }

  handleFilter(e) {
    const { group, value } = e.target.dataset;
    let filters = this.state.filters;

    if (filters.hasOwnProperty(group)) {
      delete filters[group];
    } else {
      filters[group] = value
    }

    this.setState({
      filters: filters
    }, this.filterQuery)
  }

  filterQuery() {
    const filters = this.state.filters;
    const groups = Object.keys(filters);

    if (groups.length > 0) {
      const query = groups.reduce((memo, key) => {
        if (memo !== '') {
          memo += ';'
        }
        return memo + `${key}:${filters[key]}`
      }, '')

      addQuery({
        filter: query
      })
    } else {
      removeQuery('filter')
    }
  }

  render() {
    const { filters } = this.props;

    return (
      <div>
        <h2>Filter your results</h2>
        {_.map(filters.groups, (group) => {
          const active = this.state.filters[group.uid]
          return (
            <FilterList group={group} handleFilter={this.handleFilter} key={group.uid} active={active} />
          )
        })}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    filters: state.filters,
  };
}

export default connect(mapStateToProps)(FilterListContainer);
