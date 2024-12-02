import {
  DatastoreInfoContainer,
  DatastoreNavigation,
  FlintAlerts,
  Landing
} from '../../../datastores';
import React, { useEffect } from 'react';
import { RecordFull, Results } from '../../../records';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdvancedSearch } from '../../../advanced';
import { BrowsePage } from '../../../browse';
import { findWhere } from '../../../reusable/underscore';
import { GetThisPage } from '../../../getthis';
import { H1 } from '../../../reusable';
import { List } from '../../../lists';
import { NoMatch } from '../../../pages';
import { SearchBox } from '../../../search';
import { setDocumentTitle } from '../../../a11y';
import { switchPrideToDatastore } from '../../../pride';

const DatastorePage = () => {
  const { pathname } = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const { active: activeFilters } = useSelector((state) => {
    return state.filters;
  });
  const { active: currentDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const activeDatastore = findWhere(datastores, {
    uid: currentDatastore
  });
  const institution = useSelector((state) => {
    return state.institution;
  });
  const { institutions } = useSelector((state) => {
    return state.profile || {};
  });
  const { page, query, searching, sort } = useSelector((state) => {
    return state.search;
  });
  const currentFilters = activeFilters[currentDatastore];
  const activeFilterCount = currentFilters ? Object.keys(currentFilters).length : 0;
  const isAdvanced = useSelector((state) => {
    return Boolean(state.advanced[currentDatastore]);
  });
  const list = useSelector((state) => {
    return state.lists[currentDatastore];
  });

  useEffect(() => {
    if (params.datastoreSlug) {
      switchPrideToDatastore(params.datastoreSlug);
    }
  }, [params.datastoreSlug, dispatch]);

  useEffect(() => {
    if (activeDatastore) {
      const titleSegments = [activeDatastore.name];

      if (query) {
        titleSegments.unshift(query);
      } else if (pathname.endsWith('/browse')) {
        titleSegments.unshift('Browse');
      }

      setDocumentTitle(titleSegments);
    }
  }, [activeDatastore, query, pathname]);

  if (!activeDatastore) {
    return null;
  }

  return (
    <main className='main-container'>
      <Routes>
        <Route
          path='browse'
          element={['databases', 'onlinejournals'].includes(activeDatastore.uid) ? <BrowsePage /> : <NoMatch />}
        />
        <Route
          path='advanced'
          element={isAdvanced ? <AdvancedSearch /> : <NoMatch />}
        />
        <Route
          path='/*'
          element={(
            <>
              <SearchBox />
              <DatastoreNavigation {...{ activeFilters, activeInstitution: institution.active, currentDatastore, datastores, institution, page, query, sort }} />
              <FlintAlerts {...{ datastore: activeDatastore.uid, institutions }} />
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
                  element={<List {...{ activeDatastore, list }} />}
                />
                <Route
                  index
                  element={
                    searching
                      ? (
                          <>
                            <H1 className='visually-hidden'>{activeDatastore.name}</H1>
                            <DatastoreInfoContainer {...{ name: activeDatastore.name, uid: activeDatastore.uid }} />
                            <Results {...{ activeDatastore, activeFilterCount, institution }} />
                          </>
                        )
                      : (
                          <Landing {...{ activeDatastore, institution }} />
                        )
                  }
                />
              </Routes>
            </>
          )}
        />
      </Routes>
    </main>
  );
};

export default DatastorePage;
