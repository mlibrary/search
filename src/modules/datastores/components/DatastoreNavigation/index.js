import React from 'react';
import { getDatastoreUidBySlug, stringifySearchQueryForURL } from '../../../pride';
import { changeActiveDatastore } from '../../actions';
import { Icon } from '../../../core';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function DatastoreNavigation (props) {
  const { match, datastores, search, activeFilters, history, institution } = props;
  const routeDatastoreUid = getDatastoreUidBySlug(match.params.datastoreSlug);
  const activeDatastoreUid = datastores.active;

  if (routeDatastoreUid !== activeDatastoreUid) {
    changeActiveDatastore(routeDatastoreUid);
  }

  return (
    <div className='datastore-list-container datastore-scroll-container'>
      <nav className='datastore-scroll-x' aria-label='Datastores'>
        <ol className='datastore-list'>
          {datastores.datastores.map((datastore) => {
            const queryString = stringifySearchQueryForURL({
              query: search.query,
              filter: activeFilters[datastore.uid],
              page: search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid],
              sort: search.sort[datastore.uid],
              library: datastore.uid === 'mirlyn' ? institution.active : undefined
            });
            const active = datastore.uid === activeDatastoreUid;

            return (
              <li className='datastore-item' key={datastore.uid}>
                <button
                  onClick={() => {
                    return history.push(`/${datastore.slug}${queryString.length > 0 ? `?${queryString}` : ''}`);
                  }}
                  aria-pressed={active}
                  className={`datastore-button ${active ? 'datastore-button--active' : ''}`}
                >
                  {datastore.isMultisearch && <Icon name='multi-result' />}
                  {datastore.name}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

DatastoreNavigation.propTypes = {
  match: PropTypes.object,
  datastores: PropTypes.object,
  search: PropTypes.object,
  activeFilters: PropTypes.object,
  history: PropTypes.object,
  institution: PropTypes.object
};

export default withRouter(connect(
  (state) => {
    return {
      datastores: state.datastores,
      search: state.search,
      activeFilters: state.filters.active,
      institution: state.institution
    };
  },
  (dispatch) => {
    return bindActionCreators({
      changeActiveDatastore
    }, dispatch);
  }
)(DatastoreNavigation));
