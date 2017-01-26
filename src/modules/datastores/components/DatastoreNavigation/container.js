import React from 'react';
import { connect } from 'react-redux';

import DatastoreNavigationPresenter from './presenter';

class DatastoreNavigationContainer extends React.Component {
  render() {
    const { datastores } = this.props;
    return <DatastoreNavigationPresenter datastores={datastores} />;
  }
};

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
  };
}

export default connect(mapStateToProps)(DatastoreNavigationContainer);
