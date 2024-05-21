import { setA11yMessage } from './';
import store from './../../store';

const setDocumentTitle = (titles) => {
  const documentTitle = titles.concat('Library Search').join(' - ');

  document.title = documentTitle;
  store.dispatch(setA11yMessage(documentTitle));
};

export default setDocumentTitle;
