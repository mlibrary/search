import React from 'react';

import { SearchBox } from '../../../search';
import { DatastoreNavigation } from '../../../datastores';
import { FilterList } from '../../../filters';
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
        <FilterList />
        <RecordList />
      </div>
    </div>
  );
};

export default DatastorePage;
