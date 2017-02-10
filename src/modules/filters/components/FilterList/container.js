import React from 'react';
import { connect } from 'react-redux';
import { _ } from 'underscore';

import FilterList from './presenter';

class FilterListContainer extends React.Component {
  render() {
    const { filters } = this.props;

    return (
      <div>
        {_.map(filters.groups, (group) => {
          return (
            <FilterList group={group} />
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
