import React from 'react';

import { DatastoreNavigationItem } from '../DatastoreNavigationItem';

export default function DatastoreNavigationPresenter ({ datastores, search }) {
  if (datastores.datastores.length === 0) {
    return (
      <div className="datastore-list-container">
        <div className="container-narrow container">
          <p className="datastore-item-loading">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="datastore-list-container">
      <div className="container-narrow container">
        <ul className="datastore-list">
          {datastores.datastores.map(ds => (
            <DatastoreNavigationItem
              datastore={ds}
              key={ds.uid}
              search={search}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
