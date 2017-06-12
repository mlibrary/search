import { _ } from 'underscore';
import deepcopy from 'deepcopy'

import config from '../../../config'
import store from '../../../store'

const isFilterItemChecked = ({
  datastoreUid,
  filterUid,
  activeFilters,
  filters
}) => {
  // Get the configuration for this specific filter
  const filterConfig = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

  // If this filterUid exists on the activeFilters hash
  const isActive = activeFilters && activeFilters[filterUid]

  // The filter is active and it's active state is it's configured checked condition
  if (isActive && (activeFilters[filterUid][0] === filterConfig.checkedCondition)) {
    return true
  }

  // When the filter is not active, has a config, and the configuration has it checked by default
  if (!isActive && filterConfig && (filterConfig.checkedCondition === filterConfig.defaultValueOnSpectrum)) {
    return true
  }

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
  const activeFiltersCopy = deepcopy(activeFilters)
  /*
    Two options:

    a) if addActiveFilter is true, then add new active filter
    to activeFilters object

    b) if addActiveFilter is false, then the the passed filterItemValue
    must be removed from the filterUid values

  */
  if (addActiveFilter) {
    if (activeFiltersCopy) {
      if (activeFiltersCopy[filterUid]) {
        return Object.assign(activeFiltersCopy, {
          [filterUid]: activeFiltersCopy[filterUid].concat(filterItemValue)
        })
      } else {
        return Object.assign(activeFiltersCopy, {
          [filterUid]: [].concat(filterItemValue)
        })
      }
    } else {
      return {
        [filterUid]: [].concat(filterItemValue)
      }
    }
  } else {
    return Object.assign(activeFiltersCopy, {
      [filterUid]: activeFiltersCopy[filterUid].filter(value => value !== filterItemValue)
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
      // TODO
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
