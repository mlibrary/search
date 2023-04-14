import React from 'react';
import { connect } from 'react-redux';
import { stringifySearchQueryForURL } from '../../../pride';

/*
  Adds the Institution (aka Library or Library Scope) filter
  to the URL if it is not already active.
*/
class InstitutionWrapper extends React.Component {
  pushLibraryScopeToURL = () => {
    const { datastore, institution } = this.props;

    if (datastore === 'mirlyn' && !institution.active) {
      const {
        match,
        history,
        search,
        activeFilters
      } = this.props;

      const library = datastore.uid === 'mirlyn' ? institution.active : institution.defaultInstitution;
      const page = search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid];
      const queryString = stringifySearchQueryForURL({
        query: search.query,
        filter: activeFilters[datastore.uid],
        page,
        sort: search.sort[datastore.uid],
        library
      });

      const url = `/${match.params.datastoreSlug}?${queryString}`;
      history.push(url);
    }
  };

  componentDidMount () {
    this.pushLibraryScopeToURL();
  }

  componentDidUpdate () {
    this.pushLibraryScopeToURL();
  }

  render () {
    return this.props.children;
  }
}

function mapStateToProps (state) {
  return {
    datastore: state.datastores.active,
    institution: state.institution,
    search: state.search,
    activeFilters: state.filters.active
  };
}

export default connect(mapStateToProps)(InstitutionWrapper);
