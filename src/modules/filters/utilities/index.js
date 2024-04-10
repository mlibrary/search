import qs from 'qs';

export function getSearchStateFromURL () {
  return qs.parse(document.location.search.substring(1), { allowDots: true });
};

const newSearchFilter = ({ proposed = {}, existing = {} }) => {
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

export function stringifySearch (searchStateObj) {
  return qs.stringify(searchStateObj, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format: 'RFC1738'
  });
}

export function newSearch (data) {
  const urlSearchState = getSearchStateFromURL();
  const filter = newSearchFilter({
    proposed: data.filter,
    existing: urlSearchState.filter
  });

  return stringifySearch({
    ...urlSearchState,
    ...data,
    filter
  });
}

export function getURLWithFiltersRemoved ({ group, value, all = false }) {
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
}
