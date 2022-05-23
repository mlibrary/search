/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { connect } from "react-redux";
import _ from "underscore";
import { Route, Switch } from "react-router-dom";

import { NoMatch } from "../../../pages";

import { SearchBox } from "../../../search";

import { AdvancedSearch } from "../../../advanced";

import {
  DatastoreNavigation,
  DatastoreInfo,
  Landing,
} from "../../../datastores";

import { Filters } from "../../../filters";

import { BrowsePage, BrowseInfo } from "../../../browse";

import {
  RecordList,
  Pagination,
  BentoboxList,
  RecordFull,
} from "../../../records";

import { GetThisPage } from "../../../getthis";

import { switchPrideToDatastore } from "../../../pride";

import { InstitutionSelect, InstitutionWrapper } from "../../../institution";

import { List } from "../../../lists";

import { setDocumentTitle } from "../../../a11y";

import { FlintAlerts } from "../../../flint";

const ConnectedSwitch = connect(mapStateToProps)(Switch);

class DatastorePageContainer extends React.Component {
  componentDidMount() {
    // Switch Pride to the appropriate datastore
    const { datastoreSlug } = this.props.match.params;
    switchPrideToDatastore(datastoreSlug);
  }

  componentDidUpdate() {
    const { activeDatastore, query } = this.props;

    if (activeDatastore) {
      if (query) {
        setDocumentTitle([query, activeDatastore.name]);
      } else {
        setDocumentTitle([activeDatastore.name]);
      }
    }
  }

  render() {
    const {
      searching,
      match,
      location,
      isAdvanced,
      activeFilterCount,
      activeDatastore,
    } = this.props;

    if (activeDatastore === undefined) {
      return null;
    }

    return (
      <main className="main-container">
        <Switch>
          <Route
            path={`/:datastoreSlug/browse`}
            location={location}
            render={() => {
              if (
                activeDatastore.uid === "databases" ||
                activeDatastore.uid === "onlinejournals"
              ) {
                return <BrowsePage />;
              }

              return <NoMatch />;
            }}
          />
          <Route
            path={`/:datastoreSlug/advanced`}
            location={location}
            render={() => {
              if (isAdvanced) {
                return (
                  <AdvancedSearch
                    handleBasicSearchQueryChange={this.handleChange}
                    searchQueryFromURL={location.search}
                  />
                );
              }

              return <NoMatch />;
            }}
          />
          <Route
            path={`/:datastoreSlug`}
            location={location}
            render={() => (
              <React.Fragment>
                <SearchBox />
                <DatastoreNavigation />
                <div
                  css={{
                    marginTop: "-0.75rem",
                    ".alert-inner": {
                      display: "flex",
                      justifyContent: "center",
                    },
                    ":empty": {
                      display: "none",
                    },
                  }}
                >
                  <FlintAlerts />
                </div>
                <ConnectedSwitch>
                  <Route
                    path={match.url + `/record/:recordUid/get-this/:barcode`}
                    render={(props) => {
                      return <GetThisPage />;
                    }}
                  />
                  <Route
                    path={match.url + `/record/:recordUid`}
                    exact
                    render={(props) => {
                      return <RecordFull />;
                    }}
                  />
                  <Route
                    path={match.url + `/list`}
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
                          {!searching ? (
                            <div className="container">
                              <Landing activeDatastore={activeDatastore} />
                            </div>
                          ) : (
                            <>
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
              </React.Fragment>
            )}
          />
        </Switch>
      </main>
    );
  }
}

const Results = ({ activeDatastore, activeFilterCount }) => {
  if (activeDatastore.isMultisearch) {
    return (
      <div className="container container-large flex-container">
        <BentoboxList />
      </div>
    );
  }

  const hasActiveFilters = activeFilterCount > 0;
  const summaryClassName = hasActiveFilters
    ? "small-screen-filter-summary small-screen-filter-summary--active-filters"
    : "small-screen-filter-summary";

  return (
    <div
      className="container container-medium flex-container"
      style={{ marginTop: "0.75rem" }}
    >
      {!activeDatastore.isMultisearch ? (
        <div className="side-container">
          <details
            className="small-screen-filter-details"
            css={{
              [`@media (min-width: 980px)`]: {
                display: 'none'
              }
            }}
          >
            <summary className={summaryClassName}>
              Filters
              {hasActiveFilters ? ` (${activeFilterCount})` : null}
            </summary>
            <React.Fragment>
              <InstitutionSelect />
              <Filters />
              <BrowseInfo datastore={activeDatastore} />
            </React.Fragment>
          </details>
          <div
            css={{
              [`@media (max-width: 979px)`]: {
                display: 'none'
              }
            }}
          >
            <React.Fragment>
              <InstitutionSelect />
              <Filters />
              <BrowseInfo datastore={activeDatastore} />
            </React.Fragment>
          </div>
        </div>
      ) : null}
      <div className="results-container">
        <RecordList />
        <Pagination />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const activeFilters = state.filters.active[state.datastores.active];

  return {
    searching: state.search.searching,
    query: state.search.query,
    datastores: state.datastores,
    activeDatastore: _.findWhere(state.datastores.datastores, {
      uid: state.datastores.active,
    }),
    location: state.router.location,
    isAdvanced: state.advanced[state.datastores.active] ? true : false,
    activeFilterCount: activeFilters ? Object.keys(activeFilters).length : 0,
  };
}

export default connect(mapStateToProps)(DatastorePageContainer);
