import { addDatastore, changeActiveDatastore } from './actions';
import DatastoreInfoContainer from './components/DatastoreInfoContainer';
import DatastoreNavigation from './components/DatastoreNavigation';
import datastoresReducer from './reducer/';
import FlintAlerts from './components/FlintAlerts';
import Landing from './components/Landing';

// CHECK ALL COMPONENTS FOR STYLES TO BE IMPORTED

export {
  addDatastore, // GOOD
  changeActiveDatastore, // GOOD
  DatastoreInfoContainer,
  DatastoreNavigation,
  datastoresReducer, // GOOD
  FlintAlerts,
  Landing
};
