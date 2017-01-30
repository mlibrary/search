import React from 'react';

import { DatastoreNavigation } from '../../../datastores';
import { SearchBox } from '../../../search';

const DatastorePage = function DatastorePage() {
  return (
    <div>
      <SearchBox />
      <DatastoreNavigation />
      <p>Datastore page placeholder.</p>
    </div>
  );
};

export default DatastorePage;
