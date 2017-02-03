import React from 'react';
import { connect } from 'react-redux';

import DatastoreNavigationPresenter from './presenter';

class DatastoreNavigationContainer extends React.Component {
  render() {
    const { datastores, search } = this.props;
    return <DatastoreNavigationPresenter datastores={datastores} search={search} />;
  }
};

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
    search: state.search,
  };
}

export default connect(mapStateToProps)(DatastoreNavigationContainer);
