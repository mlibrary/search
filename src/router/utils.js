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

export {
  removeQuery,
  addQuery,
  getCurrentLocation,
}
