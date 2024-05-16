import { findWhere } from '../../../reusable/underscore';
import store from '../../../../store';

const getCatalogNarrowSearchToOptions = (data, activeFilters) => {
  const getActiveFilter = ({ defaultFilter, filters, uid }) => {
    if (activeFilters?.[uid]) {
      return activeFilters[uid][0];
    }

    if (filters.includes(defaultFilter)) {
      return defaultFilter;
    }

    return filters[0];
  };

  const state = store.getState();
  const library = state.institution.active
    ? state.institution.active
    : state.institution.defaultInstitution;

  const inst = findWhere(data.filters, { uid: 'institution' });
  const instFilterLabels = inst.values.map((filter) => {
    return filter.label;
  });
  const instActiveFilter = getActiveFilter({
    defaultFilter: library,
    filters: instFilterLabels,
    uid: 'institution'
  });

  const location = findWhere(inst.values, { label: instActiveFilter });
  const locationFilterLabels = location.values.map((value) => {
    return value.label;
  });
  const locationDefault = findWhere(data.defaults, { uid: 'location' });
  const locationActiveFilter = getActiveFilter({
    defaultFilter: locationDefault.value,
    filters: locationFilterLabels,
    uid: 'location'
  });

  const collection = findWhere(location.values, { label: locationActiveFilter });
  const collectionFilterLabels = collection.values.map((value) => {
    return value.label;
  });
  const collectionDefault = findWhere(data.defaults, { uid: 'collection' });
  const collectionActiveFilter = getActiveFilter({
    defaultFilter: collectionDefault.value,
    filters: collectionFilterLabels,
    uid: 'collection'
  });

  return [
    {
      activeFilter: instActiveFilter,
      filters: instFilterLabels,
      label: inst.field,
      uid: 'institution'
    },
    {
      activeFilter: locationActiveFilter,
      filters: locationFilterLabels,
      label: location.field,
      uid: 'location'
    },
    {
      activeFilter: collectionActiveFilter,
      filters: collectionFilterLabels,
      label: collection.field,
      uid: 'collection'
    }
  ];
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
      return { isActive, value: filterValue };
    });

    return {
      ...filterGroup,
      activeFilters: activeFilters?.[filterGroup.uid] || [],
      filters
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
