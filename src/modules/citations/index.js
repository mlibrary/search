import CSL from 'citeproc'

const citations = {

}

const citeprocSys = {
  retrieveLocale: function (lang){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://raw.githubusercontent.com/Juris-M/citeproc-js-docs/master/locales-' + lang + '.xml', false);
    xhr.send(null);
    return xhr.responseText;
  },
  retrieveItem: function(id){
    return citations[id];
  }
};

function getProcessor(styleID) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://raw.githubusercontent.com/citation-style-language/styles/master/' + styleID + '.csl', false);
  xhr.send(null);
  var styleAsText = xhr.responseText;
  var citeproc = new CSL.Engine(citeprocSys, styleAsText);
  return citeproc;
};

function cite(chosenStyleID, itemIDs) {
  var citeproc = getProcessor(chosenStyleID);
  citeproc.updateItems(itemIDs);
  var result = citeproc.makeBibliography();
  return result[1].join('\n');
}

export {
  cite
}