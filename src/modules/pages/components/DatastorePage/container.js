import React from 'react'
import { connect } from 'react-redux'
import Responsive from 'react-responsive';
import { _ } from 'underscore'
import {
  Route,
  Switch
} from 'react-router-dom'

import {
  NoMatch
} from '../../../pages'

import {
  SearchBox,
} from '../../../search'

import {
  AdvancedSearch
} from '../../../advanced'

import {
  DatastoreNavigation,
  DatastoreInfo,
  Landing
} from '../../../datastores'

import {
  Filters
} from '../../../filters'

import {
  BrowsePage,
  BrowseInfo
} from '../../../browse'

import {
  RecordList,
  Pagination,
  BentoboxList,
  RecordFull
} from '../../../records'

import {
  GetThisPage
} from '../../../getthis'

import {
  switchPrideToDatastore
} from '../../../pride'

import {
  InstitutionSelect,
  InstitutionWrapper
} from '../../../institution'

import {
  List
} from '../../../lists'

import {
  setDocumentTitle
} from '../../../a11y'

import {
  FlintAlerts
} from '../../../flint'

const ConnectedSwitch = connect(mapStateToProps)(Switch);

class DatastorePageContainer extends React.Component {
  componentWillMount() {
    // Switch Pride to the appropriate datastore
    const { datastoreSlug } = this.props.match.params
    switchPrideToDatastore(datastoreSlug)
  }

  render() {
    const {
      searching,
      datastores,
      match,
      location,
      isAdvanced,
      activeFilterCount,
      query
    } = this.props;

    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (activeDatastore === undefined) {
      return null // LOADING TODO: Fade IN?
    }

    return (
      <main className="main-container">
        <Switch>
          <Route path={`/:datastoreSlug/browse`} location={location} render={() => {
            if (activeDatastore.uid === 'databases' || activeDatastore.uid === 'journals') {
              return (
                <BrowsePage />
              )
            }

            return <NoMatch/>
          }}/>
          <Route path={`/:datastoreSlug/advanced`} location={location} render={() => {
            if (isAdvanced) {
              return (
                <AdvancedSearch
                  handleBasicSearchQueryChange={this.handleChange}
                  searchQueryFromURL={location.search}
                />
              )
            }

            return <NoMatch/>
          }}/>
          <Route path={`/:datastoreSlug`} location={location} render={() => (
            <React.Fragment>
              <SearchBox />
              <DatastoreNavigation />
              <FlintAlerts />
              <ConnectedSwitch>
                <Route path={match.url + `/record/:recordUid/get-this/:barcode`} render={(props) => {
                  return (
                    <GetThisPage />
                  )
                }}/>
                <Route path={match.url + `/record/:recordUid`} exact render={(props) => {
                  return (
                    <RecordFull />
                  )
                }}/>
                <Route path={match.url + `/list`} exact render={(props) => {
                  return (
                    <List />
                  )
                }}/>
                <Route match={match.url} render={() => {
                  if (query) {
                    setDocumentTitle([query, activeDatastore.name])
                  } else {
                    setDocumentTitle([activeDatastore.name])
                  }

                  return (
                    <InstitutionWrapper>
                      {!searching ? (
                        <div className="container">
                          <Landing activeDatastore={activeDatastore} />
                        </div>
                      ) : (
                        <Responsive minDeviceWidth={960}>
                          <DatastoreInfo activeDatastore={activeDatastore} />
                        </Responsive>
                      )}
                      <Results searching={searching} activeDatastore={activeDatastore} activeFilterCount={activeFilterCount} />
                    </InstitutionWrapper>
                  )
                }}/>
              </ConnectedSwitch>
            </React.Fragment>
          )}/>
        </Switch>
      </main>
    )
  }
}

const Results = ({ searching, activeDatastore, activeFilterCount }) => {
  if (activeDatastore.isMultisearch && searching) {
    return <MultisearchSearching activeDatastore={activeDatastore}/>
  }

  return (
    <div className="container container-medium flex-container">
      {!activeDatastore.isMultisearch ? (
        <div className="side-container">
          <Responsive minDeviceWidth={960}>
            {(matches) => {
              if (matches) {
                return (
                  <React.Fragment>
                    {searching ? (<InstitutionSelect />) : null}
                    <Filters />
                    {searching ? (<BrowseInfo datastore={activeDatastore} />) : null}
                  </React.Fragment>
                )
              } else {
                const hasActiveFilters = activeFilterCount > 0
                const summaryClassName = hasActiveFilters ? "small-screen-filter-summary small-screen-filter-summary--active-filters" : "small-screen-filter-summary"

                return (
                  <details className="small-screen-filter-details">
                    <summary className={summaryClassName}>Filters {hasActiveFilters ? (`(${activeFilterCount})`) : null}</summary>

                    {searching ? (<InstitutionSelect />) : null}
                    <Filters />
                    {searching ? (<BrowseInfo datastore={activeDatastore} />) : null}
                  </details>
                )
              }
            }}
          </Responsive>
        </div>
      ) : null }

      {searching ? (
        <div className="results-container">
          <RecordList />
          <Pagination />
        </div>
      ) : null }
    </div>
  )
}

const MultisearchSearching = () => {
  return (
    <div className="container container-large flex-container">
      <BentoboxList />
    </div>
  )
}

function mapStateToProps(state) {
  const activeFilters = state.filters.active[state.datastores.active]

  return {
    searching: state.search.searching,
    query: state.search.query,
    datastores: state.datastores,
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false,
    activeFilterCount: activeFilters ? Object.keys(activeFilters).length : 0
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
