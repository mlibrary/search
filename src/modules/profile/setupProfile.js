import prejudice from '../lists/prejudice';
import {
  addProfile
} from './actions';
import store from '../../store';

const setupProfile = () => {
  const observer = (data) => {
    store.dispatch(addProfile(data));
  };

  prejudice.instance.addProfileObserver(observer);
};

export default setupProfile;
