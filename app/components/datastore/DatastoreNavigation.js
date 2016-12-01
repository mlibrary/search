import React from 'react'

import { connect } from 'react-redux';

export class DatastoreNavigation extends React.Component {
  render() {
    return (
      <div className="datastore-list-container">
        <div className="container-narrow container">
          <ul className="datastore-list">
            {datastores.map(datastore =>
              <DatastoreNavigationItem
                key={datastore.uid}
                uid={datastore.uid}
                name={datastore.name}
              />
            )}
          </ul>
        </div>
      </div>
    )
  }
}
