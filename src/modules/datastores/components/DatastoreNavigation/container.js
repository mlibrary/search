import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDatastoreUidBySlug } from '../../../pride';
import { changeActiveDatastore } from '../../actions';
import DatastoreNavigationPresenter from './presenter';
import PropTypes from 'prop-types';

class DatastoreNavigationContainer extends React.Component {
  componentDidMount () {
    const { datastores, match } = this.props;
    const routeDatastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug);
    const activeDatastoreUid = datastores.active;

    if (routeDatastoreUid !== activeDatastoreUid) {
      this.props.changeActiveDatastore(routeDatastoreUid);
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { datastores, match } = nextProps;
    const routeDatastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug);
    const activeDatastoreUid = datastores.active;

    if (routeDatastoreUid !== activeDatastoreUid) {
      this.props.changeActiveDatastore(routeDatastoreUid);
    }
  }

  render () {
    const {
      datastores,
      search,
      activeFilters,
      institution,
      history
    } = this.props;

    return (
      <DatastoreNavigationPresenter
        datastores={datastores}
        search={search}
        activeFilters={activeFilters}
        history={history}
        institution={institution}
      />
    );
  }
};

DatastoreNavigationContainer.propTypes = {
  datastores: PropTypes.object,
  match: PropTypes.object,
  changeActiveDatastore: PropTypes.func,
  search: PropTypes.object,
  activeFilters: PropTypes.object,
  institution: PropTypes.object,
  history: PropTypes.object
};

function mapStateToProps (state) {
  return {
    datastores: state.datastores,
    search: state.search,
    activeFilters: state.filters.active,
    institution: state.institution
  };
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    changeActiveDatastore
  }, dispatch);
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(DatastoreNavigationContainer));
