/*
const getAdvancedFields = ({
  data,
  datastoreUid
}) => {
  let advancedFields = []
  const defaultFields = config.advanced.defaultFields

  if (defaultFields) {
    advancedFields = advancedFields.concat(defaultFields)
  }

  if (data && data.fields) {
    advancedFields = advancedFields.concat(data.fields.reduce((prev, field) => {
      const fieldExists = _.findWhere(advancedFields, { uid: field.uid }) ? true : false

      if (!fieldExists) {
        prev = prev.concat({
          uid: field.uid,
          name: field.metadata.name,
        })
      }

      return prev
    }, []))
  }

  return advancedFields
}
*/

import { _ } from 'underscore'
import {
  advancedSearchConfig
} from '../../../config/'

const getAdvancedFields = ({
  datastoreUid,
  fields
}) => {
  console.log('getAdvancedFields')
  console.log('datastoreUid', datastoreUid)
  console.log('fields', fields)
  console.log('advancedSearchConfig', advancedSearchConfig)

  try {
    const fieldConfig = advancedSearchConfig[datastoreUid].fields

    // Check to see if configured fields exist in Redux (from Spectrum)
    const configuredFields = fieldConfig.reduce((prev, fieldConfig) => {
      const fieldExists = _.findWhere(fields, { uid: fieldConfig.uid }) ? true : false

      console.log('fieldConfig', fieldConfig)

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
     // statements to handle any exceptions
     console.log('Error handling configured fields', e); // pass exception object to error handler
  }

  return []
}

const getAdvancedFilters = ({
  datastoreUid,
  filters
}) => {
  return []
}

const getAdvancedSearchData = ({
  datastoreUid,
  AdvancedSearchConfig,
  fields,
}) => {

  // Used for display.
  return {
    fields: [],
    filters: []
  }
}

export {
  getAdvancedFields,
  getAdvancedFilters
}
