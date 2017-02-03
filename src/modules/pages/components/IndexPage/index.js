import React from 'react';

import { DatastoreNavigation } from '../../../datastores';
import { SearchBox } from '../../../search';

const IndexPage = function DatastorePage() {
  return (
    <div>
      <SearchBox />
      <DatastoreNavigation />
      <div className="container container-narrow">
        <h2>Welcome to New Search</h2>

        <p>We have consolidated our major discovery interfaces into this one application
          for easier access to the library’s physical and digital resources.</p>
      </div>
    </div>
  );
};

export default IndexPage;
