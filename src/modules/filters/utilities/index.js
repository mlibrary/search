import { getSearchStateFromURL, stringifySearch } from '../../search';

const newSearchFilter = ({ existing = {}, proposed = {} }) => {
  const groups = Object.keys(proposed).concat(Object.keys(existing));
  const filter = groups.reduce((acc, group) => {
    const uniqueValues = new Set([].concat(proposed[group] || []).concat(existing[group] || []));
    return {
      ...acc,
      [group]: Array.from(uniqueValues)
    };
  }, {});

  return filter;
};

const newSearch = (data) => {
  const urlSearchState = getSearchStateFromURL();
  const filter = newSearchFilter({
    existing: urlSearchState.filter,
    proposed: data.filter
  });

  return stringifySearch({
    ...urlSearchState,
    ...data,
    filter
  });
};

const getURLWithFiltersRemoved = ({ all = false, group, value }) => {
  const { pathname, search } = window.location;
  const queryParams = new URLSearchParams(search);
  if (all) {
    const filterParams = Array.from(queryParams.keys()).filter((key) => {
      return key.startsWith('filter.');
    });
    filterParams.forEach((filter) => {
      queryParams.delete(filter);
    });
  } else {
    queryParams.delete(`filter.${group}`, value);
  }
  return `${pathname}?${queryParams}`;
};

export { getURLWithFiltersRemoved, newSearch };
