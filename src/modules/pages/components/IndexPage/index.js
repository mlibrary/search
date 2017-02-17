import React from 'react';

import { DatastoreNavigation } from '../../../datastores';
import { SearchBox } from '../../../search';

const IndexPage = function DatastorePage() {
  return (
    <div>
      <SearchBox />
      <DatastoreNavigation />
      <div className="container container-narrow">
        <p>Index page.</p>
      </div>
    </div>
  );
};

export default IndexPage;
