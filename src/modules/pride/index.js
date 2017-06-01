import {
  initializePride,
  switchPrideToDatastore,
  runSearch,
} from './setup'
import {
  isSlugADatastore,
  getDatastoreUidBySlug,
  getDatastoreName,
  getMultiSearchRecords,
  getStateFromURL
} from './utils'
import URLSearchQueryWrapper from './components/URLSearchQueryWrapper'

export {
  initializePride,
  isSlugADatastore,
  switchPrideToDatastore,
  runSearch,
  getDatastoreName,
  getDatastoreUidBySlug,
  getMultiSearchRecords,
  URLSearchQueryWrapper,
  getStateFromURL
}
