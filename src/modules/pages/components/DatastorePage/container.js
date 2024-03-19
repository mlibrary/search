/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import { findWhere } from '../../../reusable/underscore';
import { Route, Routes } from 'react-router-dom';
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

const ConnectedRoutes = connect(mapStateToProps)(Routes);

class DatastorePageContainer extends React.Component {
  componentDidMount () {
    // Switch Pride to the appropriate datastore
    const { datastoreSlug } = this.props.match.params;
    switchPrideToDatastore(datastoreSlug);
  }

  componentDidUpdate () {
    const { activeDatastore, query, location } = this.props;

    if (activeDatastore) {
      if (query) {
        setDocumentTitle([query, activeDatastore.name]);
      } else if (location.pathname.endsWith('/browse')) {
        setDocumentTitle(['Browse', activeDatastore.name]);
      } else {
        setDocumentTitle([activeDatastore.name]);
      }
    }
  }

  render () {
    const {
      searching,
      profile,
      match,
      location,
      isAdvanced,
      activeFilterCount,
      activeDatastore,
      institution
    } = this.props;

    if (activeDatastore === undefined) {
      return null;
    }

    return (
      <main className='main-container'>
        <Routes>
          <Route
            path='/:datastoreSlug/browse'
            location={location}
            render={() => {
              if (['databases', 'onlinejournals'].includes(activeDatastore.uid)) {
                return <BrowsePage />;
              }
              return <NoMatch />;
            }}
          />
          <Route
            path='/:datastoreSlug/advanced'
            location={location}
            render={() => {
              if (isAdvanced) {
                return (
                  <AdvancedSearch
                    onChange={this.handleChange}
                    searchQueryFromURL={location.search}
                  />
                );
              }
              return <NoMatch />;
            }}
          />
          <Route
            path='/:datastoreSlug'
            location={location}
            render={() => {
              return (
                <>
                  <SearchBox />
                  <DatastoreNavigation {...this.props} />
                  <FlintAlerts datastore={activeDatastore.uid} profile={profile} />
                  <ConnectedRoutes>
                    <Route
                      path={match.url + '/record/:recordUid/get-this/:barcode'}
                      render={(props) => {
                        return <GetThisPage />;
                      }}
                    />
                    <Route
                      path={match.url + '/record/:recordUid'}
                      exact
                      render={(props) => {
                        return <RecordFull />;
                      }}
                    />
                    <Route
                      path={match.url + '/list'}
                      exact
                      render={() => {
                        return <List {...this.props} />;
                      }}
                    />
                    <Route
                      match={match.url}
                      render={() => {
                        if (!searching) {
                          return <Landing activeDatastore={activeDatastore} institution={institution} />;
                        }

                        return (
                          <>
                            <H1 className='visually-hidden'>
                              {activeDatastore.name}
                            </H1>
                            <DatastoreInfoContainer activeDatastore={activeDatastore} />
                            <Results
                              activeDatastore={activeDatastore}
                              activeFilterCount={activeFilterCount}
                              institution={institution}
                            />
                          </>
                        );
                      }}
                    />
                  </ConnectedRoutes>
                </>
              );
            }}
          />
        </Routes>
      </main>
    );
  }
}

DatastorePageContainer.propTypes = {
  match: PropTypes.object,
  profile: PropTypes.object,
  activeDatastore: PropTypes.object,
  query: PropTypes.string,
  searching: PropTypes.bool,
  location: PropTypes.object,
  isAdvanced: PropTypes.bool,
  activeFilterCount: PropTypes.number,
  institution: PropTypes.object
};

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

function mapStateToProps (state) {
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
    location: state.router.location,
    isAdvanced: !!state.advanced[currentDatastore],
    activeFilterCount: currentFilters ? Object.keys(currentFilters).length : 0,
    institution: state.institution,
    list: state.lists[currentDatastore]
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
