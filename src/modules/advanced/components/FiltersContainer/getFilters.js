import { findWhere } from '../../../reusable/underscore';
import store from '../../../../store';

const getCatalogNarrowSearchToOptions = (data, activeFilters) => { 
  function getActiveFilter ({ uid, defaultFilter, filters }) {
    if (activeFilters && activeFilters[uid]) {
      return activeFilters[uid][0];
    }

    if (filters.includes(defaultFilter)) {
      return defaultFilter;
    }

    return filters[0];
  }

  const state = store.getState();
  const library = state.institution.active
    ? state.institution.active
    : state.institution.defaultInstitution;

  const inst = findWhere(data.filters, { uid: 'institution' });
  const instFilterLabels = inst.values.map((filter) => {
    return filter.label;
  });
  const instActiveFilter = getActiveFilter({
    uid: 'institution',
    defaultFilter: library,
    filters: instFilterLabels
  });

  const location = findWhere(inst.values, { label: instActiveFilter });
  const locationFilterLabels = location.values.map((value) => {
    return value.label;
  });
  const locationDefault = findWhere(data.defaults, { uid: 'location' });
  const locationActiveFilter = getActiveFilter({
    uid: 'location',
    defaultFilter: locationDefault.value,
    filters: locationFilterLabels
  });

  const collection = findWhere(location.values, { label: locationActiveFilter });
  const collectionFilterLabels = collection.values.map((value) => {
    return value.label;
  });
  const collectionDefault = findWhere(data.defaults, { uid: 'collection' });
  const collectionActiveFilter = getActiveFilter({
    uid: 'collection',
    defaultFilter: collectionDefault.value,
    filters: collectionFilterLabels
  });

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
    }
  ];

  return options;
};

const getFilters = ({ filterGroups, activeFilters }) => {
  if (!filterGroups) {
    return [];
  }

  const advancedFilters = filterGroups.map((filterGroup) => {
    // Special case for narrowing search...
    if (filterGroup.uid === 'narrow_search') {
      const options = getCatalogNarrowSearchToOptions(filterGroup, activeFilters);
      return { ...filterGroup, options };
    }

    // Mapping filters and checking if they are active
    const filters = filterGroup.filters.map((filterValue) => {
      const isActive = activeFilters?.[filterGroup.uid]?.includes(filterValue) || false;
      return { value: filterValue, isActive };
    });

    return {
      ...filterGroup,
      filters,
      activeFilters: activeFilters?.[filterGroup.uid] || []
    };
  });

  // Group filters by 'groupBy' property
  return advancedFilters.reduce((acc, filter) => {
    const { groupBy } = filter;
    if (!acc[groupBy]) {
      acc[groupBy] = [];
    }
    acc[groupBy].push(filter);
    return acc;
  }, {});
};

export default getFilters;
