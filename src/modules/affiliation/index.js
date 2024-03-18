import ChooseAffiliation from './components/choose-affiliation';
import affiliationReducer from './reducer';
import { setDefaultAffiliation, setActiveAffiliation } from './actions';

export function affiliationCookieSetter (affiliation) {
  if (affiliation) {
    document.cookie = `affiliation=${affiliation};path=/`;
  }
}

export {
  ChooseAffiliation,
  affiliationReducer,
  setDefaultAffiliation,
  setActiveAffiliation
};
