import React from 'react';

import { DatastoreNavigationItem } from '../';

const DatastoreNavigationPresenter = function DatastoreNavigation() {
  const { datastores } = this.props;
  return (
    <div className="datastore-list-container">
      <div className="container-narrow container">
        <ul className="datastore-list">
          {datastores.map(ds => (
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

return DatastoreNavigationPresenter;
