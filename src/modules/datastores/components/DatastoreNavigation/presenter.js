import React from 'react';
import { Icon } from '../../../core';
import { stringifySearchQueryForURL } from '../../../pride';
import PropTypes from 'prop-types';

const isActive = ({
  uid,
  activeUid
}) => {
  return uid === activeUid;
};

const DatastoreNavigationPresenter = ({
  datastores,
  search,
  activeFilters,
  institution,
  history
}) => {
  return (
    <div className='datastore-list-container datastore-scroll-container'>
      <nav className='datastore-scroll-x' aria-label='Datastores'>
        <ol className='datastore-list'>
          {datastores.datastores.map((ds) => {
            return (
              <DatastoreNavigationItem
                key={ds.uid}
                datastore={ds}
                datastores={datastores}
                search={search}
                activeFilters={activeFilters}
                institution={institution}
                history={history}
              />
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

DatastoreNavigationPresenter.propTypes = {
  datastores: PropTypes.object,
  search: PropTypes.object,
  activeFilters: PropTypes.object,
  institution: PropTypes.object,
  history: PropTypes.object
};

const DatastoreNavigationItem = ({
  datastore,
  datastores,
  search,
  activeFilters,
  institution,
  history
}) => {
  const page = search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid];
  // We only want to use library if it is Mirlyn aka the catalog
  const library = datastore.uid === 'mirlyn' ? institution.active : undefined;
  const queryString = stringifySearchQueryForURL({
    query: search.query,
    filter: activeFilters[datastore.uid],
    page,
    sort: search.sort[datastore.uid],
    library
  });

  let url = '';

  if (queryString.length > 0) {
    url = `/${datastore.slug}?${queryString}`;
  } else {
    url = `/${datastore.slug}`;
  }

  const active = isActive({
    uid: datastore.uid,
    activeUid: datastores.active
  });
  const activeClassName = active ? 'datastore-button--active' : '';
  const classNames = `datastore-button ${activeClassName}`;
  return (
    <li className='datastore-item' key={datastore.uid}>
      <button
        onClick={() => {
          return history.push(url);
        }}
        aria-pressed={active}
        className={classNames}
      >
        <>
          {datastore.isMultisearch && <Icon name='multi-result' />}
          {datastore.name}
        </>
      </button>
    </li>
  );
};

DatastoreNavigationItem.propTypes = {
  datastore: PropTypes.object,
  datastores: PropTypes.object,
  search: PropTypes.object,
  activeFilters: PropTypes.object,
  institution: PropTypes.object,
  history: PropTypes.object
};

export default DatastoreNavigationPresenter;
