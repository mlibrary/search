import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDatastoreUidBySlug } from '../../../pride';
import { changeActiveDatastore } from '../../actions';
import DatastoreNavigationPresenter from './presenter';
import PropTypes from 'prop-types';

function DatastoreNavigationContainer (props) {
  const routeDatastoreUid = getDatastoreUidBySlug(props.match.params.datastoreSlug);
  const activeDatastoreUid = props.datastores.active;

  if (routeDatastoreUid !== activeDatastoreUid) {
    changeActiveDatastore(routeDatastoreUid);
  }

  return (
    <DatastoreNavigationPresenter
      datastores={props.datastores}
      search={props.search}
      activeFilters={props.activeFilters}
      history={props.history}
      institution={props.institution}
    />
  );
};

DatastoreNavigationContainer.propTypes = {
  match: PropTypes.object,
  datastores: PropTypes.object,
  search: PropTypes.object,
  activeFilters: PropTypes.object,
  history: PropTypes.object,
  institution: PropTypes.object
};

export default withRouter(connect(
  (state) => {
    return {
      datastores: state.datastores,
      search: state.search,
      activeFilters: state.filters.active,
      institution: state.institution
    };
  },
  (dispatch) => {
    return bindActionCreators({
      changeActiveDatastore
    }, dispatch);
  }
)(DatastoreNavigationContainer));
