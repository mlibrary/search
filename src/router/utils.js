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

const encodeQuery = (text) => {
  return encodeURIComponent(text).replace(/%20/g, "+").replace(/%3A/g, ":")
}

const createSearchParams = ({ query, filters }) => {
  let filterString = '';
  let queryString = '';
  let params = [];

  if (filters) {
    const filterGroups = Object.keys(filters);

    if (filterGroups.length > 0) {
      filterString = filterGroups
        .map((key) => `${encodeQuery(key)}:${encodeQuery(filters[key].filters.join('|'))}`)
        .join(';');

      params.push(`filter=${filterString}`)
    }
  }

  if (query) {
    queryString = `query=${encodeQuery(query)}`;
    params.push(queryString)
  }

  if (params.length === 0) {
    return '';
  }

  return `?${params.join('&')}`;
}

export {
  removeQuery,
  addQuery,
  getCurrentLocation,
  createSearchParams
}
