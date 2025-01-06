import { useLocation, useParams } from 'react-router-dom';
import { findWhere } from '../../underscore';
import { useSelector } from 'react-redux';

const ContextProvider = ({ render }) => {
  const { pathname } = useLocation();
  const { recordUid } = useParams();
  const { active: activeDatastoreUid, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const datastore = findWhere(datastores, { uid: activeDatastoreUid });

  let viewType = 'Medium';

  if (pathname.endsWith('/everything')) {
    viewType = 'Preview';
  }
  if (recordUid) {
    viewType = 'Full';
  }
  if (pathname.endsWith('/list')) {
    viewType = 'List';
  }

  return render({ datastore, viewType });
};

export default ContextProvider;
