import React from 'react';

const DatastoreNavigationItem = function DatastoreNavigationItem({ datastore }) {
  const { name } = datastore;
  return (
    <li>{name}</li>
  );
};

DatastoreNavigationItem.propTypes = {
  datastore: React.PropTypes.shape({
    uid: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default DatastoreNavigationItem;
