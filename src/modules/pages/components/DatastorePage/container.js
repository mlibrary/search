/** @jsxImportSource @emotion/react */
import React from 'react';
import { connect } from 'react-redux';
import _ from 'underscore';
import { Route, Switch } from 'react-router-dom';
import { NoMatch } from '../../../pages';
import { SearchBox } from '../../../search';
import { AdvancedSearch } from '../../../advanced';
import {
  DatastoreNavigation,
  DatastoreInfo,
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
import { InstitutionSelect, InstitutionWrapper } from '../../../institution';
import { List } from '../../../lists';
import { setDocumentTitle } from '../../../a11y';
import PropTypes from 'prop-types';
import { Icon } from '../../../reusable';

const ConnectedSwitch = connect(mapStateToProps)(Switch);

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
      match,
      location,
      isAdvanced,
      activeFilterCount,
      activeDatastore
    } = this.props;

    if (activeDatastore === undefined) {
      return null;
    }

    return (
      <main className='main-container'>
        <Switch>
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
                  <DatastoreNavigation />
                  <div
                    css={{
                      marginTop: '-0.75rem',
                      '.alert-inner': {
                        display: 'flex',
                        justifyContent: 'center'
                      },
                      ':empty': {
                        display: 'none'
                      }
                    }}
                  >
                    <FlintAlerts datastore={activeDatastore.uid} />
                  </div>
                  <ConnectedSwitch>
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
                      render={(props) => {
                        return <List />;
                      }}
                    />
                    <Route
                      match={match.url}
                      render={() => {
                        return (
                          <InstitutionWrapper>
                            {!searching
                              ? (
                                <Landing activeDatastore={activeDatastore} />
                                )
                              : (
                                <>
                                  <h1 id='maincontent' tabIndex='-1' className='visually-hidden'>
                                    {activeDatastore.name}
                                  </h1>
                                  <DatastoreInfo activeDatastore={activeDatastore} />
                                  <Results
                                    activeDatastore={activeDatastore}
                                    activeFilterCount={activeFilterCount}
                                  />
                                </>
                                )}
                          </InstitutionWrapper>
                        );
                      }}
                    />
                  </ConnectedSwitch>
                </>
              );
            }}
          />
        </Switch>
      </main>
    );
  }
}

DatastorePageContainer.propTypes = {
  match: PropTypes.object,
  activeDatastore: PropTypes.object,
  query: PropTypes.string,
  searching: PropTypes.bool,
  location: PropTypes.object,
  isAdvanced: PropTypes.bool,
  activeFilterCount: PropTypes.number
};

const Results = ({ activeDatastore, activeFilterCount }) => {
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
          <InstitutionSelect />
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
  activeFilterCount: PropTypes.number
};

function mapStateToProps (state) {
  const activeFilters = state.filters.active[state.datastores.active];

  return {
    searching: state.search.searching,
    query: state.search.query,
    datastores: state.datastores,
    activeDatastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active
    }),
    location: state.router.location,
    isAdvanced: !!state.advanced[state.datastores.active],
    activeFilterCount: activeFilters ? Object.keys(activeFilters).length : 0
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
