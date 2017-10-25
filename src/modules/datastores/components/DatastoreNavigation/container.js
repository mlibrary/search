import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  withRouter
} from 'react-router-dom'

import { getDatastoreUidBySlug } from '../../../pride'
import { changeActiveDatastore } from '../../actions'
import DatastoreNavigationPresenter from './presenter';

class DatastoreNavigationContainer extends React.Component {
  componentWillMount() {
    const { datastores, match } = this.props;
    const routeDatastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug)
    const activeDatastoreUid = datastores.active

    if (routeDatastoreUid !== activeDatastoreUid) {
      this.props.changeActiveDatastore(routeDatastoreUid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { datastores, match } = nextProps;
    const routeDatastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug)
    const activeDatastoreUid = datastores.active

    if (routeDatastoreUid !== activeDatastoreUid) {
      this.props.changeActiveDatastore(routeDatastoreUid)
    }
  }

  render() {
    const {
      datastores,
      search,
      activeFilters,
      institution
    } = this.props;

    return <DatastoreNavigationPresenter
              datastores={datastores}
              search={search}
              activeFilters={activeFilters}
              institution={institution} />;
  }
};

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
    search: state.search,
    activeFilters: state.filters.active,
    institution: state.institution
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeActiveDatastore
  }, dispatch)
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DatastoreNavigationContainer))
