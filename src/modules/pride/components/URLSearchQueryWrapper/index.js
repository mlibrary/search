import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'underscore'

import config from '../../../../config'
import {
  setSearchQuery,
  setSearchQueryInput,
  searching,
  setPage,
  setSort,
  resetSort
} from '../../../search/actions'
import {
  loadingRecords
} from '../../../records'
import {
  resetFilters,
  setActiveFilters,
  clearActiveFilters
} from '../../../filters'
import {
  getStateFromURL,
  runSearch,
  switchPrideToDatastore,
  getDatastoreUidBySlug
} from '../../../pride'
import {
  changeActiveDatastore,
} from '../../../datastores'
import {
  setActiveInstitution
} from '../../../institution'
import {
  setA11yMessage
} from '../../../a11y'
import { affiliationCookieSetter } from "../../../affiliation";

class URLSearchQueryWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleURLState = this.handleURLState.bind(this)
  }

  handleURLState({
    isSearching,
    datastoreUid,
    query,
    page,
    activeFilters,
    sort,
    location,
    institution
  }) {
    const urlState = getStateFromURL({ location })
    let shouldRunSearch = false

    affiliationCookieSetter(urlState.affiliation)

    if (datastoreUid) {

      // URL has state
      if ((Object.keys(urlState).length > 0)) {

        // Query
        if (urlState.query && urlState.query !== query) {
          this.props.setSearchQuery(urlState.query)
          this.props.setSearchQueryInput(urlState.query)

          shouldRunSearch = true
        } else if (!urlState.query && query) {
          this.props.setSearchQuery('')
          this.props.setSearchQueryInput('')
        }

        // Filters
        if (!_.isEqual(urlState.filter, activeFilters)) {
          if (urlState.filter) {
            this.props.setActiveFilters({
              datastoreUid,
              filters: urlState.filter
            })
          } else {
            this.props.clearActiveFilters({
              datastoreUid
            })
          }
          shouldRunSearch = true
        }

        // Page
        const urlStatePage = parseInt(urlState.page, 10)
        if (urlStatePage && (urlStatePage !== page)) {
          this.props.setPage({
            page: urlStatePage,
            datastoreUid
          })

          shouldRunSearch = true
        } else if (page && !urlStatePage && (page !== 1)) {
          this.props.setPage({
            page: 1,
            datastoreUid
          })

          shouldRunSearch = true
        }

        // Sort
        if (urlState.sort !== sort) {
          // Set sort to URL
          if (urlState.sort) {
            this.props.setSort({
              sort: urlState.sort,
              datastoreUid
            })

            shouldRunSearch = true

          // if no URL state
          } else {
            const configuredDefaultSort = config.sorts[datastoreUid].default

            // Sort should be set to default
            if (sort !== configuredDefaultSort) {
              this.props.setSort({
                sort: configuredDefaultSort,
                datastoreUid
              })

              shouldRunSearch = true
            }
          }
        }

        // library aka institution
        if (urlState.library && urlState.library !== institution.active) {
          this.props.setActiveInstitution(urlState.library)

          /*
            Users can change their library, but that does not trigger a search.
          */
          const hasMoreThanLibraryInUrlState = Object.keys(urlState).filter(key => key !== 'library').length > 0

          if (hasMoreThanLibraryInUrlState) {
            shouldRunSearch = true
          }
        }

        if (shouldRunSearch) {
          this.props.setA11yMessage(`Search modified.`)
          runSearch()
        }

      } else { // URL does not have state,
        this.props.resetFilters()
        
        /*
          You shouldn't do this in React, but this is being asked
          and better than handling a ref across concerns
        */
        let el = document.getElementById('search-query')
        if (el) {
          el.value = ""
        }
        
        // Reset query
        if (query.length > 0) {
          this.props.setSearchQuery('')
        }
      }

      /*
        Deciding when the UI should be in a "Searching" state.
        Searching state will show results instead of the
        landing page datastore information.

        Criteria to be in a "Searching" state.
          1. URL contains a query, or
          2. URL contains a filter.
      */
      if (urlState.query || urlState.filter) {
        this.props.searching(true)
      } else {
        this.props.searching(false)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const datastoreUid = getDatastoreUidBySlug(nextProps.match.params.datastoreSlug)

    if (this.props.datastoreUid !== datastoreUid) {
      switchPrideToDatastore(datastoreUid)
    }

    this.handleURLState({
      isSearching: nextProps.isSearching,
      query: nextProps.query,
      activeFilters: nextProps.activeFilters[datastoreUid],
      location: nextProps.location,
      datastoreUid: datastoreUid,
      page: nextProps.page[datastoreUid],
      sort: nextProps.sort[datastoreUid],
      institution: nextProps.institution
    })
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    query: state.search.query,
    page: state.search.page,
    f: state.filters.active,
    activeFilters: state.filters.active,
    location: state.router.location,
    datastoreUid: state.datastores.active,
    isSearching: state.search.searching,
    institution: state.institution,
    sort: state.search.sort
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSearchQuery,
    setSearchQueryInput,
    setActiveFilters,
    clearActiveFilters,
    resetFilters,
    searching,
    loadingRecords,
    changeActiveDatastore,
    setPage,
    setSort,
    resetSort,
    setActiveInstitution,
    setA11yMessage
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper)
)
