import { _ } from 'underscore';

import config from '../../../config'
import store from '../../../store'

const isFilterItemChecked = ({
  datastoreUid,
  filterUid,
  filters
}) => {
  /*
    A filter item is checked (checkboxes only) if:
      a) the filter is active and matches the config checkedCondition
      b) Has a default configuration and that is set
        - default configurations are set in Spectrum
        - If you want to do the inverse, then set the filter as active
  */
  /*

  console.log('isFilterItemChecked')
  console.log('datastoreUid', datastoreUid)
  console.log('filterUid', filterUid)
  console.log('filters', filters)

  const filter = _.findWhere(filters, {uid: filterUid})
  const filterConfig = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

  console.log('filter', filter)
  console.log('filterConfig', filterConfig)
  */

  /*
  // Option A
  const isActive = ((
    filters.active[datastoreUid] &&
    filters.active[datastoreUid][filterUid]
  ) ? true : false)
  const filterConfig = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

  // error messages
  if (!filterConfig) {
    console.log('Filter configuration does not exist for', filterUid)
    if (!filterConfig.checkedCondition) {
      console.log('Filter configuration does not contain a required `checkedConditation` for', filterUid)
    }

    return false
  }

  if (isActive) {
    const activeFilterValue = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

    if (
      activeFilterValue.length === 1 &&
      filterConfig.checkedCondition === activeFilterValue[0]) {

      return true
    }
  }
  */

  /*
  // Option B
  if (!isActive && (filterConfig.checkedCondition === filterConfig.defaultValueOnSpectrum)) {
    return true;
  }
  */

  return false
}

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

const isFilterItemActive = ({ datastoreUid, filterUid, filterItemValue }) => {
  const state = store.getState()

  if (state.filters.active[datastoreUid]) {
    if (state.filters.active[datastoreUid][filterUid]) {
      if (state.filters.active[datastoreUid][filterUid].includes(filterItemValue)) {
        return true
      }
    }
  }

  return false
}

const getDisplayFilters = ({ filters, datastoreUid }) => {
  return _.reduce(config.filters[datastoreUid], (previous, configFilter) => {
    const filter = _.findWhere(filters, { uid: configFilter.uid })

    if (filter) {
      return previous.concat(
        {
          ...filter,
          type: configFilter.type || 'multiselect',
          name: configFilter.name || filter.name
        }
      )
    }

    return previous
  }, [])
}

const getFilterItems = ({ datastoreUid, filterUid, items }) => {
  const itemsArray = _.reduce(items, (previous, item) => {
    const isActive = isFilterItemActive({
      datastoreUid,
      filterUid,
      filterItemValue: item.value
    })

    if (!isActive) {
      previous = previous.concat(item)
    }

    return previous
  }, [])

  return _.sortBy(itemsArray, 'count').reverse()
}

const getOpenFilterDefaults = () => {
  const datastoreUids = Object.keys(config.filters);

  return _.reduce(datastoreUids, (previous, datastoreUid) => {
    const openFilters = _.reduce(config.filters[datastoreUid], (list, filter) => {
      if (filter.open) {
        return list.concat(filter.uid)
      }

      return list
    }, [])

    return Object.assign({
      [datastoreUid]: openFilters
    }, previous)
  }, {})
}

const filtersWithOpenProperty = ({ open, filters }) => {
  return _.map(filters, (filter) => {
    return Object.assign({
      open: _.contains(open, filter.uid)
    }, filter)
  })
}

const getCheckboxOnClickValue = ({ datastoreUid, filterUid }) => {
  const filterConfig = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

  return filterConfig.onClickValue
}

const createActiveFilterObj = ({
  addActiveFilter,
  activeFilters,
  filterUid,
  filterItemValue
}) => {
  /*
    Two options:

    a) if addActiveFilter is true, then add new active filter
    to activeFilters object

    b) if addActiveFilter is false, then the the passed filterItemValue
    must be removed from the filterUid values

  */
  if (addActiveFilter) {
    if (activeFilters) {
      if (activeFilters[filterUid]) {
        return Object.assign(activeFilters, {
          [filterUid]: activeFilters[filterUid].concat(filterItemValue)
        })
      } else {
        return Object.assign(activeFilters, {
          [filterUid]: [].concat(filterItemValue)
        })
      }
    } else {
      return {
        [filterUid]: [].concat(filterItemValue)
      }
    }
  } else {
    return Object.assign(activeFilters, {
      [filterUid]: activeFilters[filterUid].filter(value => value !== filterItemValue)
    })
  }
}

const getActiveFilters = ({ activeFilters, filters }) => {
  /*
    Returns an Array of filters with a uid, name, and value that
    also are not a checkbox.
  */
  if (!activeFilters) {
    return []
  }

  const activeFilterUids = Object.keys(activeFilters);

  return activeFilterUids.reduce((previous, filterUid) => {
    const filter = _.findWhere(filters, { uid: filterUid })

    if (filter && (filter.type !== 'checkbox')) {
      activeFilters[filterUid].forEach((value) => {
        previous = previous.concat({
          uid: filter.uid,
          name: filter.name,
          value: value
        })
      })
    } else {
      /*
      // The filter doesn't exist in the list of filters
      // in state from Pride.
      activeFilters[filterUid].forEach((value) => {
        previous = previous.concat({
          uid: filterUid,
          name: filterUid,
          value: value
        })
      })
      */
    }

    return previous

  }, [])
}

export {
  getFiltersByType,
  isFilterItemActive,
  getDisplayFilters,
  getFilterItems,
  getOpenFilterDefaults,
  filtersWithOpenProperty,
  getActiveFilters,
  isFilterItemChecked,
  getCheckboxOnClickValue,
  createActiveFilterObj
}
