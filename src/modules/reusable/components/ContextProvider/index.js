import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'underscore';
import PropTypes from 'prop-types';

/*
  In many cases components need context information, such as
  active datastore, what kind of record is currently being displayed,
  any other information that is "global-ish".

  This component will provide that information so that components don't
  need to bring them in each time themselves.
*/
class ContextProvider extends React.Component {
  render () {
    return (
      <>{this.props.render({ ...this.props })}</>
    );
  }
}

ContextProvider.propTypes = {
  render: PropTypes.func
};

function mapStateToProps (state, props) {
  /*
    Record View Type is decided by the matched
    React Router path.
  */
  const viewType =
    props.match.url.indexOf('/everything') !== -1
      ? 'Preview'
      : props.match.path === '/:datastoreSlug'
        ? 'Medium'
        : props.match.path.indexOf('/record/') !== -1
          ? 'Full'
          : props.match.path.indexOf('/list') !== -1
            ? 'List'
            : undefined;

  /*
    Add active datastore and record view type
    to props to be used in ContextProvider as a
    render props compoennt.
  */
  return {
    datastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active
    }),
    viewType
  };
}

export default withRouter(connect(mapStateToProps)(ContextProvider));
