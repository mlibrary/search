import React from 'react'
import { store } from '../store.js'

const DatastoreListItem = ({
  uid,
  name,
  isActive,
  onDatastoreClick
}) => (
  <li
    onClick={() => {
      onDatastoreClick(uid)
    }}
    className={ isActive ? 'active' : '' }>
    {name}
  </li>
)

export const DatastoreList = ({
  datastores,
  activeDatastore,
  onDatastoreClick
}) => (
  <div className="datastore-list-container">
    <div className="container-narrow container">
      <ul className="datastore-list">
        {datastores.map(datastore =>
          <DatastoreListItem
            key={datastore.uid}
            uid={datastore.uid}
            name={datastore.name}
            isActive={activeDatastore == datastore.uid}
            onDatastoreClick={onDatastoreClick}
          />
        )}
      </ul>
    </div>
  </div>
)
