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

  // The filter is active and its active state is its configured checked condition
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

const getDisplayFilters = ({ filters, datastoreUid, searching }) => {
  const displayFilters = _.reduce(config.filters[datastoreUid], (previous, configFilter) => {
    const filter = _.findWhere(filters, { uid: configFilter.uid })

    if (filter && (searching || configFilter.persistent)) {
      return previous.concat(
        {
          ...filter,
          type: configFilter.type || 'multiselect',
          name: configFilter.name || filter.name,
          filters: configFilter.filterItems || filter.filters
        }
      )
    }

    return previous
  }, [])

  return displayFilters
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
  filterType,
  filterItemValue
}) => {
  const activeFiltersCopy = deepcopy(activeFilters)
  /*
    Two options:

    a) if addActiveFilter is true, then add new active filter
    to activeFilters object

    b) if addActiveFilter is false, then the passed filterItemValue
    must be removed from the filterUid values

  */
  if (addActiveFilter) {
    if (activeFiltersCopy) {
      if (activeFiltersCopy[filterUid] && filterType !== 'singleselect') {
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

const getActiveFilters = ({ datastoreUid, activeFilters, filters }) => {
  /*
    Returns an Array of filters with a uid, name, and value that
    also are not a checkbox or a singleselect.
  */

  let activeFiltersList = []

  if (activeFilters) {
    const activeFilterUids = Object.keys(activeFilters);

    const activeFilterObjs = activeFilterUids.reduce((previous, filterUid) => {
      const filter = _.findWhere(filters, { uid: filterUid })

      if (filter && (filter.type !== 'checkbox' && filter.type !== 'singleselect')) {
        activeFilters[filterUid].forEach((value) => {
          previous = previous.concat({
            uid: filter.uid,
            name: filter.name,
            value: value
          })
        })
      } else {
        activeFilters[filterUid].forEach((value) => {
          // This filter has a type,
          if (filter && (filter.type === 'checkbox' || filter.type === 'singleselect')) {
            //TODO
            // May want to accomodate booleans that are not
            // configured and available in state.
          } else {
            previous = previous.concat({
              uid: filterUid,
              name: filterUid,
              value: value
            })
          }
        })
      }

      return previous

    }, [])

    activeFiltersList = activeFiltersList.concat(activeFilterObjs)
  }

  return activeFiltersList
}

/*
  For returning the selected value (could be a default too) for SingleSelect filters.
*/
const getSingleSelectedFilterValue = ({ filter, activeFilters}) => {
  let selectedFilterValue = filter.filters[0].value

  // This filter has an active filter, so use that over the default.
  if (activeFilters && activeFilters[filter.uid]) {
    selectedFilterValue = activeFilters[filter.uid][0]

  // No active filter, so use the default that is available.
  } else if (filter.defaultValue) {
    selectedFilterValue = filter.defaultValue
  }

  // No default available, so use the first filter's value.
  return selectedFilterValue
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
  createActiveFilterObj,
  getSingleSelectedFilterValue
}
