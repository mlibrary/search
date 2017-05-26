import React from 'react'
import {
  NavLink
} from 'react-router-dom'

import {
  Icon
} from '../../../core'

const isActive = ({
  uid,
  activeUid,
}) => {
  return uid === activeUid
}

const DatastoreNavigationPresenter = ({
  datastores,
  search,
  queryString,
}) => {
  return (
    <div className="datastore-list-container datastore-scroll-container">
      <div className="datastore-scroll-gradient"></div>
      <div className="datastore-scroll-x">
        <ul className="datastore-list">
          {datastores.datastores.map(ds => (
            <li className="datastore-item" key={ds.uid}>
              <NavLink
                to={`/${ds.slug}${queryString}`}
                className="datastore-item-link"
                activeClassName="datastore-item-active"
                isActive={() => isActive({
                  uid: ds.uid,
                  activeUid: datastores.active
                })}>
                <div className="datastore-item-content-wrap">
                  {ds.isMultisearch && <Icon name="multi-result" />}
                  {ds.name}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DatastoreNavigationPresenter
