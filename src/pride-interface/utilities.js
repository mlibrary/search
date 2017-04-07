import { _ } from 'underscore'

const getFacetsForPride = ({ filters }) => {
  return _.reduce(filters, (previous, filter) => {
    return {
      ...previous,
      [filter.uid]: filter.filters
    }
  }, {})
}

export {
  getFacetsForPride
}
