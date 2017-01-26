import React from 'react';
import { Link } from 'react-router'

const DatastoreNavigationItem = function DatastoreNavigationItem({ datastore }) {
  const { name, slug } = datastore;
  return (
    <li><Link to={`/${slug}`}>{name}</Link></li>
  );
};

DatastoreNavigationItem.propTypes = {
  datastore: React.PropTypes.shape({
    uid: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default DatastoreNavigationItem;
