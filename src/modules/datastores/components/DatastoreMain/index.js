import { DatastoreNavigation, FlintAlerts, Landing } from '../../../datastores';
import { RecordFull, Results } from '../../../records';
import { Route, Routes } from 'react-router-dom';
import { GetThisPage } from '../../../getthis';
import { List } from '../../../lists';
import React from 'react';
import { SearchBox } from '../../../search';
import { useSelector } from 'react-redux';

const DatastoreMain = ({ activeDatastore, currentDatastore, datastores, query }) => {
  const { active: activeFilters } = useSelector((state) => {
    return state.filters;
  });
  const { active: activeInstitution, defaultInstitution, options } = useSelector((state) => {
    return state.institution;
  });
  const { page, searching, sort } = useSelector((state) => {
    return state.search;
  });
  const currentFilters = activeFilters[currentDatastore];
  const activeFilterCount = currentFilters ? Object.keys(currentFilters).length : 0;

  return (
    <>
      <SearchBox {...{ activeDatastore, query }} />
      <DatastoreNavigation {...{ activeFilters, activeInstitution, currentDatastore, datastores, page, query, sort }} />
      <FlintAlerts {...{ currentDatastore }} />
      <Routes>
        <Route
          path='record/:recordUid/get-this/:barcode'
          element={<GetThisPage />}
        />
        <Route
          path='record/:recordUid'
          element={<RecordFull />}
        />
        <Route
          path='list'
          element={<List {...{ activeDatastore, currentDatastore }} />}
        />
        <Route
          index
          element={searching ? <Results {...{ activeDatastore, activeFilterCount }} /> : <Landing {...{ activeDatastore, defaultInstitution, options }} />}
        />
      </Routes>
    </>
  );
};

export default DatastoreMain;
