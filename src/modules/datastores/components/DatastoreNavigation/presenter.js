import React from 'react';

import { DatastoreNavigationItem } from '../DatastoreNavigationItem';

export default function DatastoreNavigationPresenter ({ datastores }) {
  return (
    <div className="datastore-list-container">
      <div className="container-narrow container">
        <ul className="datastore-list">
          {datastores.datastores.map(ds => (
            <DatastoreNavigationItem
              datastore={ds}
              key={ds.uid}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
