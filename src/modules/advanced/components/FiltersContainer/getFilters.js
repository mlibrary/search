import { _ } from 'underscore'
import store from '../../../../store'

/*
// Example of what to return:
  // Return three filters:
  //  - institution
  //  - location
  //  - collection

  // Any active filters?
  //  - no? Then use defaults
  //  - yes? Then scope accordingly

  [
    {
      uid: 'institution',
      label: 'Library',
      activeFilter: 'All libraries'
      filters: [
        'All libraries'
        'William L. Clements Library'
        // ...
      ]
    },
    {
      uid: 'location',
      // ...
    },
    {
      uid: 'collection',
      // ...
    }
  ]
*/
const getCatalogNarrowSearchToOptions = (data, activeFilters) => {
  function getActiveFilter({ uid, defaultFilter, filters }) {
    if (activeFilters && activeFilters[uid]) {
      return activeFilters[uid][0]
    }

    if (_.contains(filters, defaultFilter)) {
      return defaultFilter
    }

    return filters[0]
  }

  const state = store.getState()
  const library = state.institution.active
    ? state.institution.active : state.institution.defaultInstitution

  const inst = _.findWhere(data.filters, { uid: 'institution' })
  const instFilterLabels = inst.values.map(filter => filter.label)
  const instActiveFilter = getActiveFilter({
    uid: 'institution',
    defaultFilter: library,
    filters: instFilterLabels
  })

  const location = _.findWhere(inst.values, { label: instActiveFilter })
  const locationFilterLabels = location.values.map(value => value.label)
  const locationDefault = _.findWhere(data.defaults, { uid: 'location' })
  const locationActiveFilter = getActiveFilter({
    uid: 'location',
    defaultFilter: locationDefault.value,
    filters: locationFilterLabels
  })

  const collection = _.findWhere(location.values, { label: locationActiveFilter })
  const collectionFilterLabels = collection.values.map(value => value.label)
  const collectionDefault = _.findWhere(data.defaults, { uid: 'collection' })
  const collectionActiveFilter = getActiveFilter({
    uid: 'collection',
    defaultFilter: collectionDefault.value,
    filters: collectionFilterLabels
  })

  const options = [
    {
      uid: 'institution',
      label: inst.field,
      filters: instFilterLabels,
      activeFilter: instActiveFilter
    },
    {
      uid: 'location',
      label: location.field,
      filters: locationFilterLabels,
      activeFilter: locationActiveFilter
    },
    {
      uid: 'collection',
      label: collection.field,
      filters: collectionFilterLabels,
      activeFilter: collectionActiveFilter
    },
  ]

  return options
}

const getFilters = ({ filterGroups, activeFilters }) => {
  if (!filterGroups) {
    return []
  }

  const advancedFilters = filterGroups.map(filterGroup => {

    // Special case for narrowing search...
    if (filterGroup.uid === 'narrow_search') {
      const options = getCatalogNarrowSearchToOptions(filterGroup, activeFilters)
      return {
        ...filterGroup,
        options
      }
    }

    return {
      ...filterGroup,
      filters: filterGroup.filters.map(filterValue => {
        let isActive = false

        if (activeFilters && activeFilters[filterGroup.uid]) {
          isActive = _.contains(activeFilters[filterGroup.uid], filterValue)
        }

        return {
          value: filterValue,
          isActive
        }
      }),
      activeFilters: activeFilters ? activeFilters[filterGroup.uid] : [],
    }
  })

  return _.groupBy(advancedFilters, 'groupBy')
}

export default getFilters