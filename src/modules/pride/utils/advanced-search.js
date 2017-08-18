import { _ } from 'underscore'
import {
  advancedSearchConfig
} from '../../../config/'

const getAdvancedFields = ({
  datastoreUid,
  fields
}) => {
  try {
    const fieldConfig = advancedSearchConfig[datastoreUid].fields

    // Check to see if configured fields exist in Redux (from Spectrum)
    const configuredFields = fieldConfig.reduce((prev, fieldConfig) => {
      const fieldExists = _.findWhere(fields, { uid: fieldConfig.uid }) ? true : false

      if (fieldExists) {
        prev = prev.concat({
          uid: fieldConfig.uid,
          name: fieldConfig.name,
        })
      }

      return prev
    }, [])

    return configuredFields
  }
  catch (e) {
     return undefined
  }
}

const getAdvancedFilters = ({
  datastoreUid
}) => {
  try {
    const filtersConfig = advancedSearchConfig[datastoreUid].filters

    return filtersConfig
  }
  catch (e) {
    return undefined
  }
}

export {
  getAdvancedFields,
  getAdvancedFilters
}
