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
      <div className="container container-medium flex-container">
        <div className="side-container">
          <FilterList />
        </div>
        <div className="main-container">
          <RecordListBar />
          <RecordList />
        </div>
      </div>
    </div>
  );
};

export default DatastorePage;
