import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import _ from 'underscore'

import config from '../../../../config'
import {
  setSearchQuery,
  searching,
  setPage,
  setSort
} from '../../../search/actions'
import {
  loadingRecords
} from '../../../records'
import {
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

class URLSearchQueryWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.handleURLState = this.handleURLState.bind(this)
  }

  handleURLState({
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

    if (datastoreUid) {

      // URL has state
      if ((Object.keys(urlState).length > 0)) {

        // Query
        if (urlState.query && urlState.query !== query) {
          this.props.setSearchQuery(urlState.query)

          shouldRunSearch = true
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
        if (urlState.library !== institution.active) {
          this.props.setActiveInstitution(urlState.library)

          // Do not run search if it is the landing page.
          if (Object.keys(urlState).length > 1) {
            shouldRunSearch = true
          }
        }

        if (shouldRunSearch) {
          runSearch()
        }

      } else {

        // URL does not have state, but state has active filters
        if (activeFilters && Object.keys(activeFilters).length > 0) {
          this.props.searching(false)
          this.props.clearActiveFilters({ datastoreUid })
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const datastoreUid = getDatastoreUidBySlug(nextProps.match.params.datastoreSlug)

    if (this.props.datastoreUid !== datastoreUid) {
      switchPrideToDatastore(datastoreUid)
    }

    this.handleURLState({
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
    setActiveFilters,
    clearActiveFilters,
    searching,
    loadingRecords,
    changeActiveDatastore,
    setPage,
    setSort,
    setActiveInstitution,
  }, dispatch)
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(URLSearchQueryWrapper)
)
