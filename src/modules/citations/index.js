import CSL from 'citeproc';
import { Pride } from 'pride';

const getStyle = (chosenStyleID) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', require(`./csls/${chosenStyleID}.csl`), false);
  xhr.send(null);

  return xhr.responseText;
};

const retrieveLocale = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', require('./locales-en-US.xml'), false);
  xhr.send(null);

  return xhr.responseText;
};

const cite = (records, chosenStyleID, cb) => {
  const csls = {};

  records.forEach((record) => {
    Pride.requestRecord(record.datastoreUid, record.recordUid).renderCSL((data) => {
      csls[data.id] = data;

      if (Object.keys(csls).length === records.length) {
        const citeprocSys = {
          retrieveItem (id) {
            return csls[id];
          },
          retrieveLocale
        };

        const styleAsText = getStyle(chosenStyleID);
        const citeproc = new CSL.Engine(citeprocSys, styleAsText);
        citeproc.updateItems(Object.keys(csls));
        const result = citeproc.makeBibliography();

        cb(chosenStyleID, result[1].join('\n'));
      }
    });
  });
};

export { cite };
