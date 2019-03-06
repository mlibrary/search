import { _ } from 'underscore'
import store from '../../../../store'

const getCatalogNarrowSearchToOptions = (data, activeFilters, institution) => {
  function getActiveFilter({ uid, defaultFilter, filters }) {
    if (activeFilters && activeFilters[uid]) {
      return activeFilters[uid][0]
    }

    if (_.contains(filters, defaultFilter)) {
      return defaultFilter
    }

    return filters[0]
  }

  let options = []

  // Return three filters:
  //  - institution
  //  - location
  //  - collection

  // Any active filters?
  //   - no? Then use defaults
  //   - yes? Then scope accordingly

  const state = store.getState()

  // library aka institution
  const library = state.institution.active ? state.institution.active : state.institution.defaultInstitution // Get the site wide set institution to be used with the advanced search

  // institution
  const institutionData = _.findWhere(data.filters, { uid: 'institution' })
  const institutionFilters = institutionData.values.map(value => value.label)
  const institutionActiveFilter = getActiveFilter({
    uid: 'institution',
    defaultFilter: library,
    filters: institutionFilters
  })
  options = options.concat({
    uid: 'institution',
    label: institutionData.field,
    activeFilter: institutionActiveFilter ,
    filters: institutionFilters
  })

  // location
  const locationData = _.findWhere(institutionData.values, { label: institutionActiveFilter })
  const locationDefaultFilter = _.findWhere(data.defaults, { uid: 'location' })
  const locationFilters = locationData.values.map(value => value.label)
  const locationActiveFilter = getActiveFilter({
    uid: 'location',
    defaultFilter: locationDefaultFilter.value,
    filters: locationFilters
  })
  options = options.concat({
    uid: 'location',
    label: locationData.field,
    activeFilter: locationActiveFilter,
    filters: locationFilters
  })

  // collection
  const collectionData = _.findWhere(locationData.values, { label: locationActiveFilter })
  const collectionDefaultFilter = _.findWhere(data.defaults, { uid: 'collection' })
  const collectionFilters = collectionData.values.map(value => value.label)
  const collectionActiveFilter = getActiveFilter({
    uid: 'collection',
    defaultFilter: collectionDefaultFilter.value,
    filters: collectionFilters
  })
  options = options.concat({
    uid: 'collection',
    label: collectionData.field,
    activeFilter: collectionActiveFilter,
    filters: collectionFilters
  })

  // Example of what to return:

  /*
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