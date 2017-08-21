import { _ } from 'underscore'
import {
  advancedSearchConfig
} from '../../../config/'

const getAdvancedFields = ({
  datastoreUid
}) => {
  return advancedSearchConfig[datastoreUid].fields
}

const getAdvancedFilters = ({
  datastoreUid
}) => {
  return advancedSearchConfig[datastoreUid].filters
}

export {
  getAdvancedFields,
  getAdvancedFilters
}
