import CSL from 'citeproc'
import { requestRecordCSL } from './utils'

function cite(records, chosenStyleID) {
  /*
    Turn records into this shape:
    {
      [id]: { ...record data },
      ...
    }
  */
  records.forEach(record => {
    let csls = {}

    function callback(data) {
      csls = {
        ...csls,
        [data.id]: data
      }

      if (Object.keys(csls).length === records.length) {
        // We're done waiting for all the CSLs.
        proceed(csls)
      }
    }

    requestRecordCSL({ ...record, callback })
  })

  function proceed(citations) {
    const itemIDs = Object.keys(citations)

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

    console.log('output', processorOutput())
  
    //return processorOutput()
  }
}

export {
  cite
}