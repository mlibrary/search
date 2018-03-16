import React from 'react'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive';
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
  InstitutionSelect
} from '../../../institution'

import {
  List
} from '../../../lists'


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
      isAdvanced
    } = this.props;

    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (activeDatastore === undefined) {
      return null // LOADING TODO: Fade IN?
    }

    document.title = `${activeDatastore.name} · Library Search`

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
                <Route match={match.url} render={(props) => {
                  return (
                    <div>
                      {!searching ? (
                        <div className="container">
                          <Landing activeDatastore={activeDatastore} />
                        </div>
                      ) : (
                        <MediaQuery minDeviceWidth={960}>
                          <DatastoreInfo activeDatastore={activeDatastore} />
                        </MediaQuery>
                      )}
                      <Results searching={searching} activeDatastore={activeDatastore} />
                    </div>
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

const Results = ({ searching, activeDatastore }) => {
  if (activeDatastore.isMultisearch && searching) {
    return <MultisearchSearching activeDatastore={activeDatastore}/>
  }

  return (
    <div className="container container-medium flex-container">
      {!activeDatastore.isMultisearch ? (
        <div className="side-container">
          <MediaQuery minDeviceWidth={960}>
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
                return (
                  <details>
                    <summary className="small-screen-filter-options-toggle">Refine your search options</summary>

                    {searching ? (<InstitutionSelect />) : null}
                    <Filters />
                    {searching ? (<BrowseInfo datastore={activeDatastore} />) : null}
                  </details>
                )
              }
            }}
          </MediaQuery>
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
  return {
    searching: state.search.searching,
    datastores: state.datastores,
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
