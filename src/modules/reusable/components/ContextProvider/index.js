import PropTypes from 'prop-types';
import { findWhere } from '../../underscore';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/*
  In many cases components need context information, such as
  active datastore, what kind of record is currently being displayed,
  any other information that is "global-ish".

  This component will provide that information so that components don't
  need to bring them in each time themselves.
*/
function ContextProvider (props) {
  return props.render({ ...props });
}

ContextProvider.propTypes = {
  render: PropTypes.func
};

function mapStateToProps (state, props) {
  /*
    Record View Type is decided by the matched React Router path.
  */
  let viewType = 'Medium';
  props.match.url.endsWith('/everything') && (viewType = 'Preview');
  props.match.path.endsWith('/:recordUid') && (viewType = 'Full');
  props.match.url.endsWith('/list') && (viewType = 'List');
  /*
    Add active datastore and record view type
    to props to be used in ContextProvider as a
    render props component.
  */
  return {
    datastore: findWhere(state.datastores.datastores, {
      uid: state.datastores.active
    }),
    viewType
  };
}

export default withRouter(connect(mapStateToProps)(ContextProvider));
