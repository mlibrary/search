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

const getAdvancedFields = ({
  datastoreUid,
  fields
}) => {
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
