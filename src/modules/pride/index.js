import { initializePride, switchPrideToDatastore, runSearch } from './setup';
import {
  isSlugADatastore,
  getDatastoreUidBySlug,
  getDatastoreSlugByUid,
  getDatastoreName,
  getMultiSearchRecords,
  getStateFromURL,
  prideRequestRecord,
  requestRecord,
  isValidURLSearchQuery,
  stringifySearchQueryForURL,
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
  prideRequestRecord,
  requestRecord,
  isValidURLSearchQuery,
  stringifySearchQueryForURL,
  parseField,
  isFieldASearchLink,
  requestGetThis,
  placeHold
};
