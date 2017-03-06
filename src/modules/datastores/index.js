import DatastoreNavigation from './components/DatastoreNavigation';
import Landing from './components/Landing';
import DatastoreInfo from './components/DatastoreInfo';
import datastoresReducer from './reducer/';

import {
  addDatastore,
  changeActiveDatastore,
} from './actions';

export {
  DatastoreNavigation,
  datastoresReducer,
  addDatastore,
  changeActiveDatastore,
  Landing,
  DatastoreInfo,
};
