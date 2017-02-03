import React from 'react';

import { SearchBox } from '../../../search';
import { DatastoreNavigation } from '../../../datastores';
import {
  RecordList,
  RecordListBar,
} from '../../../records';


const DatastorePage = () => {
  return (
    <div>
      <SearchBox />
      <DatastoreNavigation />
      <div className="container container-narrow">
        <RecordListBar />
        <RecordList />
      </div>
    </div>
  );
};

export default DatastorePage;
