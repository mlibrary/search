import React from 'react'
import {
  NavLink
} from 'react-router-dom'

import {
  Icon
} from '../../../core'
import {
  stringifySearchQueryForURL
} from '../../../pride'

const isActive = ({
  uid,
  activeUid,
}) => {
  return uid === activeUid
}

const DatastoreNavigationPresenter = ({
  datastores,
  search,
  activeFilters
}) => {
  return (
    <div className="datastore-list-container datastore-scroll-container">
      <div className="datastore-scroll-gradient"></div>
      <div className="datastore-scroll-x">
        <ul className="datastore-list">
          {datastores.datastores.map(ds => (
            <DatastoreNavigationItem
              key={ds.uid}
              datastore={ds}
              datastores={datastores}
              search={search}
              activeFilters={activeFilters}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const DatastoreNavigationItem = ({
  datastore,
  datastores,
  search,
  activeFilters
}) => {
  const page = search.page[datastore.uid] === 1 ? undefined : search.page[datastore.uid]
  const queryString = stringifySearchQueryForURL({
    query: search.query,
    filter: activeFilters[datastore.uid],
    page,
  })

  let url = ''

  if (queryString.length > 0) {
    url = `/${datastore.slug}?${queryString}`
  } else {
    url = `/${datastore.slug}`
  }

  return (
    <li className="datastore-item" key={datastore.uid}>
      <NavLink
        to={url}
        className="datastore-item-link"
        activeClassName="datastore-item-active"
        isActive={() => isActive({
          uid: datastore.uid,
          activeUid: datastores.active
        })}>
        <div className="datastore-item-content-wrap">
          {datastore.isMultisearch && <Icon name="multi-result" />}
          {datastore.name}
        </div>
      </NavLink>
    </li>
  )
}

export default DatastoreNavigationPresenter
