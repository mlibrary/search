import React from 'react';
import { Link } from 'react-router';

const DatastoreNavigationItem = function DatastoreNavigationItem({ name, link }) {
  return (
    <li className="datastore-item">
      <Link
        to={`/${link}`}
        className="datastore-item-link"
        activeClassName="datastore-item-active">{name}
      </Link>
    </li>
  );
};

export default DatastoreNavigationItem;
