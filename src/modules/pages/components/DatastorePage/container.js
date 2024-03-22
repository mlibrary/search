/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import { findWhere } from '../../../reusable/underscore';
import { NoMatch } from '../../../pages';
import { SearchBox } from '../../../search';
import { AdvancedSearch } from '../../../advanced';
import {
  DatastoreNavigation,
  DatastoreInfoContainer,
  Landing,
  FlintAlerts
} from '../../../datastores';
import { Filters } from '../../../filters';
import { BrowsePage, BrowseInfo } from '../../../browse';
import {
  RecordList,
  Pagination,
  BentoboxList,
  RecordFull
} from '../../../records';
import { GetThisPage } from '../../../getthis';
import { switchPrideToDatastore } from '../../../pride';
import { InstitutionSelect } from '../../../institution';
import { List } from '../../../lists';
import { setDocumentTitle } from '../../../a11y';
import PropTypes from 'prop-types';
import { H1, Icon } from '../../../reusable';

function DatastorePageContainer () {
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  const {
    activeFilters,
    profile,
    search,
    searching,
    query,
    datastores,
    activeDatastore,
    isAdvanced,
    activeFilterCount,
    institution,
    list
  } = useSelector((state) => {
    const currentDatastore = state.datastores.active;
    const currentFilters = state.filters.active[currentDatastore];

    return {
      activeFilters: state.filters.active,
      profile: state.profile,
      search: state.search,
      searching: state.search.searching,
      query: state.search.query,
      datastores: state.datastores,
      activeDatastore: findWhere(state.datastores.datastores, {
        uid: currentDatastore
      }),
      isAdvanced: !!state.advanced[currentDatastore],
      activeFilterCount: currentFilters ? Object.keys(currentFilters).length : 0,
      institution: state.institution,
      list: state.lists[currentDatastore]
    };
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
      } else if (location.pathname.endsWith('/browse')) {
        titleSegments.unshift('Browse');
      }

      setDocumentTitle(titleSegments);
    }
  }, [activeDatastore, query, location.pathname]);

  if (!activeDatastore) return null;

  return (
    <main className='main-container'>
      <Routes>
        <Route
          path='browse'
          element={['databases', 'onlinejournals'].includes(activeDatastore.uid) ? <BrowsePage /> : <NoMatch />}
        />
        <Route
          path='advanced'
          element={isAdvanced ? <AdvancedSearch searchQueryFromURL={location.search} /> : <NoMatch />}
        />
        <Route
          path='/*'
          element={
            <>
              <SearchBox />
              <DatastoreNavigation {...{ activeFilters, datastores, institution, search }} />
              <FlintAlerts datastore={activeDatastore.uid} profile={profile} />
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
                  element={<List {...{ profile, activeDatastore, institution, list }} />}
                />
                <Route
                  index
                  element={
                    !searching
                      ? (
                        <Landing activeDatastore={activeDatastore} institution={institution} />
                        )
                      : (
                        <>
                          <H1 className='visually-hidden'>{activeDatastore.name}</H1>
                          <DatastoreInfoContainer activeDatastore={activeDatastore} />
                          <Results
                            activeDatastore={activeDatastore}
                            activeFilterCount={activeFilterCount}
                            institution={institution}
                          />
                        </>
                        )
                  }
                />
              </Routes>
            </>
          }
        />
      </Routes>
    </main>
  );
}

const Results = ({ activeDatastore, activeFilterCount, institution }) => {
  if (activeDatastore.isMultisearch) {
    return (
      <div className='container container-large flex-container'>
        <BentoboxList />
      </div>
    );
  }

  const hasActiveFilters = activeFilterCount > 0;
  let summaryClassName = 'small-screen-filter-summary';
  if (hasActiveFilters) {
    summaryClassName += ' small-screen-filter-summary--active-filters';
  }

  const responsive = (mobile, desktop) => {
    return window.innerWidth < 980 ? mobile : desktop;
  };

  return (
    <div
      className='container container-medium flex-container'
      style={{ marginTop: '0.75rem' }}
    >
      <div className='side-container'>
        <h2 className='visually-hidden'>{activeDatastore.name} Filter Options</h2>
        <button
          className={`small-screen-filter-details ${summaryClassName}`}
          onClick={(event) => {
            const filters = document.querySelector('#filter-details');
            const getDisplay = filters.style.display;
            filters.style.display = getDisplay === 'none' ? 'block' : 'none';
            event.target.querySelector('.expand-more-icon').style.display = filters.style.display === 'none' ? 'block' : 'none';
            event.target.querySelector('.expand-less-icon').style.display = filters.style.display === 'block' ? 'block' : 'none';
            event.target.setAttribute('aria-expanded', filters.style.display !== 'none');
          }}
          css={{
            alignItems: 'center',
            gap: '0.5rem',
            width: '100%',
            display: 'flex',
            '@media (min-width: 980px)': {
              display: 'none'
            }
          }}
          aria-expanded={responsive('false', 'true')}
          aria-controls='filter-details'
        >
          <Icon
            icon='expand_more'
            className='expand-more-icon'
            style={{
              display: responsive('block', 'none')
            }}
          />
          <Icon
            icon='expand_less'
            className='expand-less-icon'
            style={{
              display: responsive('none', 'block')
            }}
          />
          <span>
            Filters
            {hasActiveFilters ? ` (${activeFilterCount})` : null}
          </span>
        </button>
        <div
          id='filter-details'
          style={{
            display: responsive('none', 'block')
          }}
          css={{
            '@media (max-width: 979px)': {
              display: 'none'
            },
            '@media (min-width: 980px)': {
              display: 'block!important'
            }
          }}
        >
          <InstitutionSelect activeDatastore={activeDatastore} institution={institution} />
          <Filters />
          <BrowseInfo datastore={activeDatastore} />
        </div>
      </div>
      <div className='results-container'>
        <h2 className='visually-hidden'>{activeDatastore.name} Results</h2>
        <RecordList />
        <Pagination />
      </div>
    </div>
  );
};

Results.propTypes = {
  activeDatastore: PropTypes.object,
  activeFilterCount: PropTypes.number,
  institution: PropTypes.object
};

export default DatastorePageContainer;
