import React from 'react';
import { connect } from 'react-redux';

import DatastoreNavigationPresenter from './presenter';

class DatastoreNavigationContainer extends React.Component {
  render() {
    const { datastores, search, filters } = this.props;
    const activeFilters = filters.active;

    return <DatastoreNavigationPresenter
      datastores={datastores}
      search={search}
      activeFilters={activeFilters}/>;
  }
};

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
    search: state.search,
    filters: state.filters,
  };
}

export default connect(mapStateToProps)(DatastoreNavigationContainer);
