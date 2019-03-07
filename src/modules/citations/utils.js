import { Pride } from 'pride'

function requestRecordCSL({ datastoreUid, recordUid, callback }) {
  Pride.requestRecord(datastoreUid, recordUid).renderCSL(data => callback(data))
}

/*
  Take a styleID and return the CSL style.
  CSLS are kept in a directory and copied
  from https://github.com/citation-style-language/styles/
*/
function getStyle(styleID) {
  var xhr = new XMLHttpRequest();
  const path = require('./csls/' + styleID + '.csl')
  xhr.open('GET', path, false);
  xhr.send(null);

  return xhr.responseText
}

export {
  getStyle,
  requestRecordCSL
}