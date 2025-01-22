import apa from './apa';
import bibtex from './bibtex';
import chicago from './chicago';
import ieee from './ieee';
import locale from './locale';
import mla from './mla';
import nlm from './nlm';

const citations = {
  APA: apa,
  BibTex: bibtex,
  Chicago: chicago,
  IEEE: ieee,
  MLA: mla,
  NLM: nlm
};

// Const citations = [
//   {
//     Id: 'modern-language-association',
//     Name: 'MLA',
//     Style: mla
//   },
//   {
//     Id: 'apa-5th-edition',
//     Name: 'APA',
//     Style: apa
//   },
//   {
//     Id: 'chicago-note-bibliography-16th-edition',
//     Name: 'Chicago',
//     Style: chicago
//   },
//   {
//     Id: 'ieee',
//     Name: 'IEEE',
//     Style: ieee
//   },
//   {
//     Id: 'national-library-of-medicine-grant-proposals',
//     Name: 'NLM',
//     Style: nlm
//   },
//   {
//     Id: 'bibtex',
//     Name: 'BibTex',
//     Style: bibtex
//   }
// ];

export {
  citations,
  locale
};
