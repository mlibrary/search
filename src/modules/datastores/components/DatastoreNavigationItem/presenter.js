import React from 'react';
import { Link } from 'react-router';

import {
  getCurrentLocation
} from '../../../../router';

const DatastoreNavigationItem = function DatastoreNavigationItem({ datastore, search }) {
  const { name, slug } = datastore;
  const search_url = getCurrentLocation().search;

  return (
    <li className="datastore-item">
      <Link
        to={`/${slug}${search_url}`}
        className="datastore-item-link"
        activeClassName="datastore-item-active">{name}
      </Link>
    </li>
  );
};

export default DatastoreNavigationItem;
