import store from './../../store';
import { setA11yMessage } from './';

export default function setDocumentTitle (titles) {
  const documentTitle = titles.concat('Library Search').join(' - ');
  store.dispatch(setA11yMessage(documentTitle));
  document.title = documentTitle;
};
