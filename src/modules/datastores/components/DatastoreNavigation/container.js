import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import qs from 'qs'
import {
  withRouter
} from 'react-router-dom'

import { getDatastoreUidBySlug } from '../../../pride'
import { changeActiveDatastore } from '../../actions'
import DatastoreNavigationPresenter from './presenter';

class DatastoreNavigationContainer extends React.Component {
  componentDidUpdate() {
    const { datastores, match } = this.props;
    const routeDatastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug)
    const activeDatastoreUid = datastores.active

    if (routeDatastoreUid !== activeDatastoreUid) {
      this.props.changeActiveDatastore(routeDatastoreUid)
    }
  }

  render() {
    const { datastores, search } = this.props;
    const queryString = search.query.length > 0 && search.searching ? `?${qs.stringify({query: search.query})}` : ''

    return <DatastoreNavigationPresenter
              datastores={datastores}
              search={search}
              queryString={queryString}  />;
  }
};

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
    search: state.search,
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
