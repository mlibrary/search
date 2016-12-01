import React from 'react'

const DatastoreNavigationItem = (props) => {
  return (
    <li
      onClick={() => {
        onDatastoreClick(uid)
      }}
      className={ isActive ? 'active' : '' }>
      {name}
    </li>
  )
}

export const DatastoreNavigation = (props) => {
  return (
    <div className="datastore-list-container">
      <div className="container-narrow container">
        <ul className="datastore-list">
          {datastores.map(datastore =>
            <DatastoreNavigationItem
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
}
