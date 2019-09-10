import qs from "qs";
import { _ } from "underscore";

/*
  newQuery

  Args:
    - filter
    - query
    - sort
    - library
    - page
*/
export function newSearch(data) {
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

export function getSearchStateFromURL() {
  return qs.parse(document.location.search.substring(1), { allowDots: true });
}

export function stringifySearch(searchStateObj) {
  return qs.stringify(searchStateObj, {
    arrayFormat: "repeat",
    encodeValuesOnly: true,
    allowDots: true,
    format: "RFC1738"
  });
}

export function newSearchFilter({ proposed = {}, existing = {} }) {
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
  Remove a filter from the URL.

  Removes the value from a filter group
  and will remove the group if the value
  is the group's only value.

  returns a new URL with the filter removed.
*/
export function getURLWithFilterRemoved({ group, value }) {
  const urlSearchState = getSearchStateFromURL();
  const groups = Object.keys(urlSearchState.filter);
  const filter = groups.reduce((acc, g) => {
    if (g === group) {
      if (Array.isArray(urlSearchState.filter[g])) {
        acc = {
          ...acc,
          [g]: urlSearchState.filter[g].filter(val => val !== value)
        };
      }
    } else {
      acc = {
        ...acc,
        [g]: urlSearchState.filter[g]
      };
    }

    return acc;
  }, {});
  const newSearchState = {
    ...urlSearchState,
    filter
  };

  return document.location.pathname + "?" + stringifySearch(newSearchState);
}

export function getURLWithoutFilters() {
  return (
    document.location.pathname +
    "?" +
    stringifySearch({
      ...getSearchStateFromURL(),
      filters: undefined
    })
  );
}

/*
  Remove active filter values from the
  list of filter objects that contain
  that value.

  active: ["Book"]
  filters: [
    {
      value: "Book",
      ...
    },
    {
      value: "Serial"
    },
    {
      ...
    }
  ]

  output:
  [
    {
      value: "Serial"
    },
    {
      ...
    }
  ]

*/

export function filterOutActiveFilters({ active, filters }) {
  if (!active) {
    return filters;
  }

  return filters.filter(({ value }) => !_.contains(active, value));
}
