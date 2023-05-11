import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import config from '../../../../config';
import {
  setSearchQuery,
  setSearchQueryInput,
  searching,
  setPage,
  setSort,
  resetSort,
  setParserMessage
} from '../../../search/actions';
import { loadingRecords } from '../../../records';
import {
  resetFilters,
  setActiveFilters,
  clearActiveFilters
} from '../../../filters';
import {
  getStateFromURL,
  runSearch,
  switchPrideToDatastore,
  getDatastoreUidBySlug
} from '../../../pride';
import { changeActiveDatastore } from '../../../datastores';
import { setActiveInstitution } from '../../../institution';
import { setA11yMessage } from '../../../a11y';
import { affiliationCookieSetter, setActiveAffilitation } from '../../../affiliation';
import PropTypes from 'prop-types';

class URLSearchQueryWrapper extends React.Component {
  constructor (props) {
    super(props);
    this.handleURLState = this.handleURLState.bind(this);
  }

  handleURLState ({
    datastoreUid,
    query,
    page,
    activeFilters,
    sort,
    location,
    institution
  }) {
    const urlState = getStateFromURL({ location });
    let shouldRunSearch = false;
    this.props.setActiveAffilitation(urlState.affiliation);
    affiliationCookieSetter(urlState.affiliation);

    if (datastoreUid) {
      // URL has state
      if (Object.keys(urlState).length > 0) {
        // Query
        const hasUnmatchedQuery = urlState.query && urlState.query !== query;
        if (hasUnmatchedQuery || (!urlState.query && query)) {
          this.props.setSearchQuery(urlState.query ? urlState.query : '');
          this.props.setSearchQueryInput(urlState.query ? urlState.query : '');
          shouldRunSearch = hasUnmatchedQuery;
        }

        // Filters
        if (JSON.stringify(urlState.filter) !== JSON.stringify(activeFilters)) {
          if (urlState.filter) {
            this.props.setActiveFilters({
              datastoreUid,
              filters: urlState.filter
            });
          } else {
            this.props.clearActiveFilters({
              datastoreUid
            });
          }
          shouldRunSearch = true;
        }

        // Page
        const urlStatePage = parseInt(urlState.page, 10);
        if (
          (urlStatePage && urlStatePage !== page) ||
          (page && !urlStatePage && page !== 1)
        ) {
          this.props.setPage({
            page: urlStatePage || 1,
            datastoreUid
          });
          shouldRunSearch = true;
        }

        // Sort
        if (urlState.sort !== sort) {
          const configuredDefaultSort = config.sorts[datastoreUid].default;
          shouldRunSearch = urlState.sort || sort !== configuredDefaultSort;
          if (shouldRunSearch) {
            this.props.setSort({
              sort: urlState.sort ? urlState.sort : configuredDefaultSort,
              datastoreUid
            });
          }
        }

        // Library (AKA Institution)
        if (urlState.library && urlState.library !== institution.active) {
          this.props.setActiveInstitution(urlState.library);
          /*
            Users can change their library, but that does not trigger a search.
          */
          shouldRunSearch = Object.keys(urlState).filter((key) => {
            return key !== 'library';
          }).length > 0;
        }

        // Run search
        if (shouldRunSearch) {
          this.props.setA11yMessage('Search modified.');
          this.props.setParserMessage(null);
          runSearch();
        }
      } else {
        // URL does not have state,
        this.props.resetFilters();

        // Reset query
        if (query.length > 0) {
          this.props.setSearchQuery('');
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
      this.props.searching(!!(urlState.query || urlState.filter));
    }
  }

  componentDidMount () {
    const datastoreUid = getDatastoreUidBySlug(
      this.props.match.params.datastoreSlug
    );

    switchPrideToDatastore(datastoreUid);

    this.handleURLState({
      isSearching: this.props.isSearching,
      query: this.props.query,
      activeFilters: this.props.activeFilters[datastoreUid],
      location: this.props.location,
      datastoreUid,
      page: this.props.page[datastoreUid],
      sort: this.props.sort[datastoreUid],
      institution: this.props.institution
    });
  }

  componentDidUpdate (prevProps) {
    const datastoreUid = getDatastoreUidBySlug(
      this.props.match.params.datastoreSlug
    );

    if (prevProps.datastoreUid !== datastoreUid) {
      switchPrideToDatastore(datastoreUid);
    }

    this.handleURLState({
      isSearching: this.props.isSearching,
      query: this.props.query,
      activeFilters: this.props.activeFilters[datastoreUid],
      location: this.props.location,
      datastoreUid,
      page: this.props.page[datastoreUid],
      sort: this.props.sort[datastoreUid],
      institution: this.props.institution
    });
  }

  render () {
    return <div>{this.props.children}</div>;
  }
}

URLSearchQueryWrapper.propTypes = {
  setActiveAffilitation: PropTypes.func,
  setSearchQuery: PropTypes.func,
  setSearchQueryInput: PropTypes.func,
  setActiveFilters: PropTypes.func,
  clearActiveFilters: PropTypes.func,
  setPage: PropTypes.func,
  setSort: PropTypes.func,
  setActiveInstitution: PropTypes.func,
  setA11yMessage: PropTypes.func,
  setParserMessage: PropTypes.func,
  resetFilters: PropTypes.func,
  searching: PropTypes.func,
  match: PropTypes.object,
  datastoreUid: PropTypes.string,
  isSearching: PropTypes.bool,
  query: PropTypes.string,
  activeFilters: PropTypes.object,
  location: PropTypes.object,
  page: PropTypes.object,
  sort: PropTypes.object,
  institution: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default withRouter(
  connect((state) => {
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
  }, (dispatch) => {
    return bindActionCreators(
      {
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
        setA11yMessage,
        setParserMessage,
        setActiveAffilitation
      },
      dispatch
    );
  })(URLSearchQueryWrapper)
);
