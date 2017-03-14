import React from 'react';

import { DatastoreNavigationItem } from '../DatastoreNavigationItem';
import { createSearchParams } from '../../../../router';

export default function DatastoreNavigationPresenter ({ datastores, search, activeFilters, activeDatastoreUid }) {
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
    <div className="datastore-list-container datastore-scroll-container">
      <div className="datastore-scroll-gradient"></div>
      <div className="datastore-scroll-x">
        <ul className="datastore-list">
          {datastores.datastores.map(ds => {
            const filters = activeFilters[ds.uid] || {};
            const searchParams = createSearchParams({
              filters: filters,
              query: search.query,
            })
            const link = `${ds.slug}${searchParams}`;
            const isActive = activeDatastoreUid === ds.uid

            return (
              <DatastoreNavigationItem
                name={ds.name}
                key={ds.uid}
                link={link}
                isActive={isActive}
                isMultisearch={ds.isMultisearch}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
};
