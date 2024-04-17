import { initializePride, switchPrideToDatastore, runSearch } from './setup';
import {
  isSlugADatastore,
  getDatastoreUidBySlug,
  getDatastoreSlugByUid,
  getDatastoreName,
  getMultiSearchRecords,
  getStateFromURL,
  requestRecord,
  isValidURLSearchQuery,
  prideParseField,
  parseField,
  isFieldASearchLink,
  requestGetThis
} from './utils';

import { placeHold } from './getthis';

import URLSearchQueryWrapper from './components/URLSearchQueryWrapper';

export {
  initializePride,
  isSlugADatastore,
  switchPrideToDatastore,
  runSearch,
  getDatastoreName,
  getDatastoreUidBySlug,
  getMultiSearchRecords,
  URLSearchQueryWrapper,
  getStateFromURL,
  getDatastoreSlugByUid,
  requestRecord,
  isValidURLSearchQuery,
  prideParseField,
  parseField,
  isFieldASearchLink,
  requestGetThis,
  placeHold
};
