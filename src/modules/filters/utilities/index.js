import qs from 'qs';
import _ from 'underscore';

/*
  newQuery

  Args:
    - filter
    - query
    - sort
    - library
    - page
*/
export function newSearch (data) {
  const urlSearchState = getSearchStateFromURL();
  const filter = newSearchFilter({
    proposed: data.filter,
    existing: urlSearchState.filter
  });
  const newSearchState = {
    ...urlSearchState,
    ...data,
    filter
  };

  return stringifySearch(newSearchState);
}

export function getSearchStateFromURL () {
  return qs.parse(document.location.search.substring(1), { allowDots: true });
}

export function stringifySearch (searchStateObj) {
  return qs.stringify(searchStateObj, {
    arrayFormat: 'repeat',
    encodeValuesOnly: true,
    allowDots: true,
    format: 'RFC1738'
  });
}

export function newSearchFilter ({ proposed = {}, existing = {} }) {
  const groups = Object.keys(proposed).concat(Object.keys(existing));
  const filter = groups.reduce((acc, group) => {
    return {
      ...acc,
      [group]: _.unique([].concat(proposed[group]).concat(existing[group]))
    };
  }, {});

  return filter;
}

/*
  Removes a filter from the URL by taking `window.location.search`,
  and replacing the matching filter query parameter and its value.
  Also removes the `&` before it, if it exists.
  Returns the new string.
*/
export function getURLWithFilterRemoved ({ group, value }) {
  let windowLocationSearch = window.location.search;
  const filterQuery = `filter.${group}=${value}`;
  windowLocationSearch = windowLocationSearch.replace(
    windowLocationSearch.includes(`&${filterQuery}`) ? `&${filterQuery}` : filterQuery,
    ''
  );
  return document.location.pathname + windowLocationSearch;
}

export function getURLWithoutFilters () {
  return (
    document.location.pathname +
    '?' +
    stringifySearch({
      ...getSearchStateFromURL(),
      filter: undefined
    })
  );
}

export function filterOutActiveFilters ({ active, filters }) {
  if (!active) {
    return filters;
  }

  return filters.filter(({ value }) => {
    return !_.contains(active, value);
  });
}
