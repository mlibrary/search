import React from 'react';
import { Link } from 'react-router';

const DatastoreNavigationItem = function DatastoreNavigationItem({ datastore, search }) {
  const { name, slug } = datastore;

  return (
    <li className="datastore-item">
      <Link
        to={`/${slug}`}
        className="datastore-item-link"
        activeClassName="datastore-item-active">{name}
      </Link>
    </li>
  );
};

export default DatastoreNavigationItem;
