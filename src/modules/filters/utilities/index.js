import { _ } from 'underscore';

import { config } from '../../../pride-interface'
import { store } from '../../../store'

const isFilterItemChecked = ({
  datastoreUid,
  filterUid
}) => {
  /*
    A filter item is checked (checkboxes only) if:
      a) the filter is active and matches the config checkedCondition
      b) Has a default configuration and that is set
        - default configurations are set in Spectrum
        - If you want to do the inverse, then set the filter as active
  */

  // Option A
  const state = store.getState()
  const isActive = ((
    state.filters.active[datastoreUid] &&
    state.filters.active[datastoreUid][filterUid]
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
    const activeFilterValue = state.filters.active[datastoreUid][filterUid].filters

    if (
      activeFilterValue.length === 1 &&
      filterConfig.checkedCondition === activeFilterValue[0]) {

      return true
    }
  }

  // Option B
  if (!isActive && (filterConfig.checkedCondition === filterConfig.defaultValueOnSpectrum)) {
    return true;
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
  const filterConfig = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

  if (!filterConfig) {
    console.log('not a valid filter config', filterUid)
    return false
  }

  const isActive = ((
    state.filters.active[datastoreUid] &&
    state.filters.active[datastoreUid][filterUid] &&
    _.contains(state.filters.active[datastoreUid][filterUid].filters, filterItemValue)
  ) ? true : false)

  return isActive;
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

const getActiveFilters = ({ activeFilters, filters }) => {
  return _.reduce(activeFilters, (previous, activeFilter) => {
    const filter = _.findWhere(filters, { uid: activeFilter.uid })

    if (filter && (filter.type !== 'checkbox')) {
      _.each(activeFilter.filters, (value) => {
        previous = previous.concat({
          uid: activeFilter.uid,
          name: activeFilter.name,
          value: value
        })
      })
    }

    return previous
  }, [])
}

const getCheckboxOnClickValue = ({ datastoreUid, filterUid }) => {
  const filterConfig = _.findWhere(config.filters[datastoreUid], {uid: filterUid})

  if (!filterConfig.onClickValue) {
    throw 'filterConfig missing onClickValue'
  }

  return filterConfig.onClickValue
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
}
