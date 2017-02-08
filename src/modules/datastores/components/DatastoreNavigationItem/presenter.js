import React from 'react';
import { Link } from 'react-router';

import { encodeURIQuery } from '../../../search';

const DatastoreNavigationItem = function DatastoreNavigationItem({ datastore, search }) {
  const { name, slug } = datastore;
  const query = encodeURIQuery(search.query);

  return (
    <li className="datastore-item">
      <Link
        to={`/${slug}${query}`}
        className="datastore-item-link"
        activeClassName="datastore-item-active">{name}
      </Link>
    </li>
  );
};

export default DatastoreNavigationItem;
