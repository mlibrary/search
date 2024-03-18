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

  props.setActiveAffilitation(urlState.affiliation);
  affiliationCookieSetter(urlState.affiliation);

  if (!datastoreUid) return null;

  const updateRequired = {
    query: urlState.query && urlState.query !== query,
    filters: JSON.stringify(urlState.filter) !== JSON.stringify(activeFilters),
    page: parseInt(urlState.page, 10) !== page,
    sort: urlState.sort !== sort,
    institution: urlState.library && urlState.library !== institution.active
  };

  // Run search and apply updates based on changes
  if (Object.values(updateRequired).some(Boolean)) {
    if (updateRequired.query) {
      const newQuery = urlState.query || '';
      props.setSearchQuery(newQuery);
      props.setSearchQueryInput(newQuery);
    }

    if (updateRequired.filters) {
      const actionProps = {
        datastoreUid,
        filters: urlState.filter || null
      };
      urlState.filter ? props.setActiveFilters(actionProps) : props.clearActiveFilters(actionProps);
    }

    if (updateRequired.page) {
      props.setPage({
        page: urlState.page ? parseInt(urlState.page, 10) : 1,
        datastoreUid
      });
    }

    if (updateRequired.sort) {
      props.setSort({
        sort: urlState.sort || config.sorts[datastoreUid].default,
        datastoreUid
      });
    }

    if (updateRequired.institution) {
      props.setActiveInstitution(urlState.library);
    }

    props.setA11yMessage('Search modified.');
    props.setParserMessage(null);
    runSearch();
  }

  // If URL does not have a state, reset the filters and the query
  if (!Object.keys(urlState).length) {
    props.resetFilters();
    props.setSearchQuery('');
  }

  // Decide if the UI should be in a "Searching" state based on URL having query or filter
  props.searching(Boolean(urlState.query || urlState.filter));
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
