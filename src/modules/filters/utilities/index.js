import { _ } from 'underscore';

import { config } from '../../../pride-interface';


const getFiltersByType = ({ activeDatastoreUid, filters, type }) => {

  // Pull the checkbox configurations
  const filtersOfTypeConfig = _.reduce(type, (previous, t) => {
    return previous.concat(
        _.where(config.filters[activeDatastoreUid], { type: t })
      )
  }, [])

  // Iterate over each checkbox configurations and lookup the actual filter
  // concat to array to be returned.
  if (filtersOfTypeConfig.length > 0) {
    return _.reduce(filtersOfTypeConfig, (previous, filterConfig) => {
      if (filters.groups[filterConfig.uid]) {
        return previous.concat(filters.groups[filterConfig.uid])
      }

      return previous
    }, [])
  }

  return []
}

const isFilterActive = ({ activeDatastoreUid, filters, filter }) => {
  return (
    filters.active[activeDatastoreUid] &&
    filters.active[activeDatastoreUid][filter.uid]
  )
}

export {
  getFiltersByType,
  isFilterActive
}
