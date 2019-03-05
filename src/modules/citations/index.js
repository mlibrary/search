import CSL from 'citeproc'
import { requestRecordCSL } from './utils'

function cite(records, chosenStyleID) {
  console.log('requestRecordCSL')
  console.log('records', records)

  const record_csls = records.map(record => requestRecordCSL({ ...record }))

  console.log('record_csls', record_csls)

  /*
    // TODO:

    - Transform items (aka records) into CSL JSON format. The objects need to be reorganized for keyed access. We also need an array of the keys. And store the keyed citations as `citations`, and the array of IDs as `itemIDs`.
    - Store select CSLs locally. Not from github endpoint.
    - Store locals locally. Not from github endpoint.
  */
  
  // Example code from https://citeproc-js.readthedocs.io/en/latest/deployments.html

  var chosenLibraryItems = "https://api.zotero.org/groups/459003/items?format=csljson&limit=8&itemType=journalArticle";

  var chosenStyleID = "chicago-fullnote-bibliography";

  var xhr = new XMLHttpRequest();
  xhr.open('GET', chosenLibraryItems, false);
  xhr.send(null);
  var citationData = JSON.parse(xhr.responseText);

  var citations = {};
  var itemIDs = [];
  for (var i=0,ilen=citationData.items.length;i<ilen;i++) {
    var item = citationData.items[i];
    if (!item.issued) continue;
    if (item.URL) delete item.URL;
    var id = item.id;
    citations[id] = item;
    itemIDs.push(id);
  }

  //console.log('itemIDs', itemIDs)
  //console.log('citations', citations)

  let citeprocSys = {
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

  function processorOutput() {
    var citeproc = getProcessor(chosenStyleID);
    citeproc.updateItems(itemIDs);
    var result = citeproc.makeBibliography();
    return result[1].join('\n');
  }

  return processorOutput()
}

export {
  cite
}