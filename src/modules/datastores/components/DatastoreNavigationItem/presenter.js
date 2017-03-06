import React from 'react';
import { Link } from 'react-router';

import { Icon } from '../../../core';

const DatastoreNavigationItem = function DatastoreNavigationItem({ name, link, isMultisearch }) {
  return (
    <li className="datastore-item">
      <Link
        to={`/${link}`}
        className="datastore-item-link"
        activeClassName="datastore-item-active">
          <div className="datastore-item-content-wrap">
            {isMultisearch ? (<Icon name="multi-result" />) : null }
            {name}
          </div>
      </Link>
    </li>
  );
};

export default DatastoreNavigationItem;
