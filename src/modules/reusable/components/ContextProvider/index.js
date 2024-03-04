import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { findWhere } from '../../underscore';

function ContextProvider ({ render }) {
  const location = useLocation();
  const params = useParams();

  let viewType = 'Medium';
  location.pathname.endsWith('/everything') && (viewType = 'Preview');
  params.recordUid !== undefined && (viewType = 'Full');
  location.pathname.endsWith('/list') && (viewType = 'List');

  const activeDatastoreUid = useSelector((state) => {
    return state.datastores.active;
  });
  const datastore = findWhere(
    useSelector((state) => {
      return state.datastores.datastores;
    }),
    { uid: activeDatastoreUid }
  );

  return render({ datastore, viewType });
}

ContextProvider.propTypes = {
  render: PropTypes.func.isRequired
};

export default ContextProvider;
