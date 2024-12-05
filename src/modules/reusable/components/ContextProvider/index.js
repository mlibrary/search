import { useLocation, useParams } from 'react-router-dom';
import { findWhere } from '../../underscore';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ContextProvider = ({ render }) => {
  const location = useLocation();
  const params = useParams();

  let viewType = 'Medium';

  if (location.pathname.endsWith('/everything')) {
    viewType = 'Preview';
  }
  if (params.recordUid) {
    viewType = 'Full';
  }
  if (location.pathname.endsWith('/list')) {
    viewType = 'List';
  }

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
};

ContextProvider.propTypes = {
  render: PropTypes.func.isRequired
};

export default ContextProvider;
