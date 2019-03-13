import CSL from 'citeproc'
import {
  requestRecordCSL,
  getStyle
} from './utils'

function cite(records, chosenStyleID, cb) {
  /*
    Turn records into this shape:
    {
      [id]: { ...record data },
      ...
    }
  */
  let csls = {}

  records.forEach(record => {
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
        const path = require('./locales-en-US.xml')
        xhr.open('GET', path, false);
        
        xhr.send(null);
        return xhr.responseText;
      },
      retrieveItem: function(id){
        return citations[id];
      }
    };
  
    function getProcessor(styleID) {
      var styleAsText = getStyle(styleID)
      var citeproc = new CSL.Engine(citeprocSys, styleAsText);

      return citeproc;
    };
  
    function processorOutput() {
      var citeproc = getProcessor(chosenStyleID);
      citeproc.updateItems(itemIDs);
      var result = citeproc.makeBibliography();

      return result[1].join('\n');
    }

    const output = processorOutput()
  
    cb(chosenStyleID, output) // callback
  }
}

export {
  cite
}