import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AdvancedSearch } from '../../../advanced';
import { BrowsePage } from '../../../browse';
import { DatastoreMain } from '../../../datastores';
import { findWhere } from '../../../reusable/underscore';
import { NoMatch } from '../../../pages';
import { setDocumentTitle } from '../../../a11y';
import { switchPrideToDatastore } from '../../../pride';

const DatastorePage = () => {
  const { pathname } = useLocation();
  const { datastoreSlug } = useParams();
  const dispatch = useDispatch();

  const { active: currentDatastore, datastores } = useSelector((state) => {
    return state.datastores;
  });
  const activeDatastore = findWhere(datastores, {
    uid: currentDatastore
  });
  const { query } = useSelector((state) => {
    return state.search;
  });
  const isAdvanced = useSelector((state) => {
    return Boolean(state.advanced[currentDatastore]);
  });

  useEffect(() => {
    if (datastoreSlug) {
      switchPrideToDatastore(datastoreSlug);
    }
  }, [datastoreSlug, dispatch]);

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
          element={<DatastoreMain {...{ activeDatastore, currentDatastore, datastores, query }} />}
        />
      </Routes>
    </main>
  );
};

export default DatastorePage;
