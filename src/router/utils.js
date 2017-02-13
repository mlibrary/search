import { browserHistory } from 'react-router';

const addQuery = (query) => {
  const location = Object.assign({}, browserHistory.getCurrentLocation());
  Object.assign(location.query, query);
  browserHistory.push(location);
};

const removeQuery = (...queryNames) => {
  const location = Object.assign({}, browserHistory.getCurrentLocation());
  queryNames.forEach(q => delete location.query[q]);
  browserHistory.push(location);
};

const getCurrentLocation = () => {
  return Object.assign({}, browserHistory.getCurrentLocation());
}

const getSearchQueries = ({ datastoreUid, query, activeFilters }) => {
  console.log('getSearchQueries', datastoreUid)
  console.log('query', query)
  console.log('activeFilters', activeFilters)

  const filterGroups = Object.keys(activeFilters);

  console.log('filterGroups', filterGroups)

  if (filterGroups.length > 0) {
    const query = filterGroups.reduce((memo, key) => {
      if (memo !== '') {
        memo += ';'
      }
      return memo + `${key}:${activeFilters[key]}`
    }, '')

    return query;
  }

  return '';
}

export {
  removeQuery,
  addQuery,
  getCurrentLocation,
  getSearchQueries
}
