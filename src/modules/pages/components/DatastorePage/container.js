import React from 'react'
import { connect } from 'react-redux'
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
  RecordList,
  Pagination,
  BentoboxList,
  RecordFull
} from '../../../records'

import {
  switchPrideToDatastore
} from '../../../pride'

import {
  InstitutionSelect
} from '../../../institution'


const ConnectedSwitch = connect(mapStateToProps)(Switch);

class DatastorePageContainer extends React.Component {
  componentWillMount() {
    // Switch Pride to the appropriate datastore
    const { datastoreSlug } = this.props.match.params
    switchPrideToDatastore(datastoreSlug)
  }

  render() {
    const { searching, datastores, match, location, isAdvanced, query } = this.props;
    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    if (activeDatastore === undefined) {
      return null // LOADING TODO: Fade IN?
    }

    document.title = `${activeDatastore.name} · Library Search`

    return (
      <Switch>
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
          <div>
            <SearchBox />
            <DatastoreNavigation />
            <ConnectedSwitch>
              <Route path={match.url + `/record/:recordUid`} render={(props) => {
                return (
                  <RecordFull />
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
                      <DatastoreInfo activeDatastore={activeDatastore} />
                    )}
                    <Results searching={searching} activeDatastore={activeDatastore} />
                  </div>
                )
              }}/>
            </ConnectedSwitch>
          </div>
        )}/>
      </Switch>

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
          {searching ? (<InstitutionSelect />) : null}
          <Filters />
        </div>
      ) : null }

      <div className="main-container">
        {searching ? (
          <div>
            <RecordList />
            <Pagination />
          </div>
        ) : null }
      </div>
    </div>
  )
}

const MultisearchSearching = () => (
  <div className="container container-large flex-container">
    <div className="main-container">
      <BentoboxList />
    </div>
  </div>
)

function mapStateToProps(state) {
  return {
    searching: state.search.searching,
    datastores: state.datastores,
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
