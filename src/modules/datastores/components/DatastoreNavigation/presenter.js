import React from 'react'
import {
  NavLink
} from 'react-router-dom'

import {
  Icon
} from '../../../core'

const DatastoreNavigationPresenter = ({
  datastores,
  search,
  location
}) => {
  return (
    <div className="datastore-list-container datastore-scroll-container">
      <div className="datastore-scroll-gradient"></div>
      <div className="datastore-scroll-x">
        <ul className="datastore-list">
          {datastores.datastores.map(ds => (
            <li className="datastore-item" key={ds.uid}>
              <NavLink
                to={`/${ds.slug}`}
                className="datastore-item-link"
                activeClassName="datastore-item-active">
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
