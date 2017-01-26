import React from 'react';
import { Link } from 'react-router'
import styles from './styles.css'

const DatastoreNavigationItem = function DatastoreNavigationItem({ datastore }) {
  const { name, slug } = datastore;
  return (
    <li className="datastore-item"><Link to={`/${slug}`} className="datastore-link" activeClassName="datastore-item-active ">{name}</Link></li>
  );
};

DatastoreNavigationItem.propTypes = {
  datastore: React.PropTypes.shape({
    uid: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default DatastoreNavigationItem;
