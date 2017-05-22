import { _ } from 'underscore'

const getFacetsForPride = ({ filters }) => {
  return _.reduce(filters, (previous, filter) => {
    return {
      ...previous,
      [filter.uid]: filter.filters
    }
  }, {})
}

/**
 * getDatastore() takes a datastore unique id {uid}
 * and an array of {datastores} objects, then returns
 * matching datastore Object or undefined if not found.
 */
const getDatastore = ({ uid, datastores }) => {
  return datastores.filter((ds) => {
    return ds.uid === uid
  })[0]
}

export {
  getFacetsForPride,
  getDatastore
}
