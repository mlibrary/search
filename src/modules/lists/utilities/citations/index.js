import apa from './apa';
import bibtex from './bibtex';
import chicago from './chicago';
import ieee from './ieee';
import locale from './locale';
import mla from './mla';
import nlm from './nlm';

/* eslint-disable sort-keys */
const citations = {
  MLA: mla,
  APA: apa,
  Chicago: chicago,
  IEEE: ieee,
  NLM: nlm,
  BibTex: bibtex
};
/* eslint-enable sort-keys */

export {
  citations,
  locale
};
