import store from './../../store';
import { setA11yMessage } from './';

function setDocumentTitle (titles) {
  const documentTitle = titles.concat('Library Search').join(' - ');

  document.title = documentTitle;
  store.dispatch(setA11yMessage(documentTitle));
};

export default setDocumentTitle;
