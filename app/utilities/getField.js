import { _ } from 'underscore'

export const getField = (fields, key) => {
  return _.findWhere(fields, { "uid": key })
}

export const getFieldValue = (field) => {
  var value = undefined

  if (field !== undefined && typeof field === 'object') {
    if ("value" in field) {
      value = field.value
    }
  }

  return value
}
