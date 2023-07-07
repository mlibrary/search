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

function handleURLState ({
  datastoreUid,
  query,
  page,
  activeFilters,
  sort,
  location,
  institution
}, props) {
  const urlState = getStateFromURL({ location });
  let shouldRunSearch = false;
  props.setActiveAffilitation(urlState.affiliation);
  affiliationCookieSetter(urlState.affiliation);

  if (datastoreUid) {
    // URL has state
    if (Object.keys(urlState).length > 0) {
      // Query
      if (urlState.query && urlState.query !== query) {
        props.setSearchQuery(urlState.query);
        props.setSearchQueryInput(urlState.query);

        shouldRunSearch = true;
      } else if (!urlState.query && query) {
        props.setSearchQuery('');
        props.setSearchQueryInput('');
      }

      // Filters
      if (JSON.stringify(urlState.filter) !== JSON.stringify(activeFilters)) {
        if (urlState.filter) {
          props.setActiveFilters({
            datastoreUid,
            filters: urlState.filter
          });
        } else {
          props.clearActiveFilters({
            datastoreUid
          });
        }
        shouldRunSearch = true;
      }

      // Page
      const urlStatePage = parseInt(urlState.page, 10);
      if (urlStatePage && urlStatePage !== page) {
        props.setPage({
          page: urlStatePage,
          datastoreUid
        });

        shouldRunSearch = true;
      } else if (page && !urlStatePage && page !== 1) {
        props.setPage({
          page: 1,
          datastoreUid
        });

        shouldRunSearch = true;
      }

      // Sort
      if (urlState.sort !== sort) {
        // Set sort to URL
        if (urlState.sort) {
          props.setSort({
            sort: urlState.sort,
            datastoreUid
          });

          shouldRunSearch = true;

          // if no URL state
        } else {
          const configuredDefaultSort = config.sorts[datastoreUid].default;

          // Sort should be set to default
          if (sort !== configuredDefaultSort) {
            props.setSort({
              sort: configuredDefaultSort,
              datastoreUid
            });

            shouldRunSearch = true;
          }
        }
      }

      // library aka institution
      if (urlState.library && urlState.library !== institution.active) {
        props.setActiveInstitution(urlState.library);

        /*
          Users can change their library, but that does not trigger a search.
        */
        const hasMoreThanLibraryInUrlState =
          Object.keys(urlState).filter((key) => {
            return key !== 'library';
          }).length > 0;

        if (hasMoreThanLibraryInUrlState) {
          shouldRunSearch = true;
        }
      }

      if (shouldRunSearch) {
        props.setA11yMessage('Search modified.');
        props.setParserMessage(null);
        runSearch();
      }
    } else {
      // URL does not have state,
      props.resetFilters();

      /*
        You shouldn't do this in React, but this is being asked
        and better than handling a ref across concerns
      */
      const el = document.getElementById('search-query');
      if (el) {
        el.value = '';
      }

      // Reset query
      if (query.length > 0) {
        props.setSearchQuery('');
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
      props.searching(true);
    } else {
      props.searching(false);
    }
  }
}

function getURLPath (props) {
  return props.location.pathname + props.location.search;
}

class URLSearchQueryWrapper extends React.Component {
  componentDidMount () {
    const datastoreUid = getDatastoreUidBySlug(
      this.props.match.params.datastoreSlug
    );

    switchPrideToDatastore(datastoreUid);

    handleURLState({
      isSearching: this.props.isSearching,
      query: this.props.query,
      activeFilters: this.props.activeFilters[datastoreUid],
      location: this.props.location,
      datastoreUid,
      page: this.props.page[datastoreUid],
      sort: this.props.sort[datastoreUid],
      institution: this.props.institution
    }, this.props);
  }

  shouldComponentUpdate (nextProps) {
    const locationsDoNotMatch = getURLPath(nextProps) !== getURLPath(this.props);

    if (locationsDoNotMatch) {
      const datastoreUid = getDatastoreUidBySlug(
        nextProps.match.params.datastoreSlug
      );

      if (this.props.datastoreUid !== datastoreUid) {
        switchPrideToDatastore(datastoreUid);
      }

      handleURLState({
        isSearching: nextProps.isSearching,
        query: nextProps.query,
        activeFilters: nextProps.activeFilters[datastoreUid],
        location: nextProps.location,
        datastoreUid,
        page: nextProps.page[datastoreUid],
        sort: nextProps.sort[datastoreUid],
        institution: nextProps.institution
      }, nextProps);
    }

    return locationsDoNotMatch;
  }

  render () {
    return this.props.children;
  }
}

URLSearchQueryWrapper.propTypes = {
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
