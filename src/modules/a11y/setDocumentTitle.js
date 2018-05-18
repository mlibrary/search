import store from './../../store'
import {
  setA11yMessage
} from './'

const setDocumentTitle = (titles) => {
  const documentTitle =  titles.concat('Library Search').join(' - ')

  //store.dispatch(setA11yMessage(documentTitle))
  document.title = documentTitle
}

export default setDocumentTitle
