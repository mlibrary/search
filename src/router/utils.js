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

const createSearchParams = ({ query, filters }) => {
  let filterString = '';
  let queryString = '';
  let params = [];

  const esc = encodeURIComponent;
  const filterGroups = Object.keys(filters);

  if (filterGroups.length > 0) {
    filterString = filterGroups
      .map((key) => `${esc([key])}${esc(':')}${esc(filters[key])}`)
      .join(esc(';'));

    params.push(`filter=${filterString}`)
  }

  if (query) {
    queryString = `q=${esc(query)}`;
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
