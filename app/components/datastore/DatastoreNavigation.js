import React from 'react'

import { connect } from 'react-redux'
import DatastoreNavigationItem from './DatastoreNavigationItem'

export class DatastoreNavigation extends React.Component {
  render() {
    const datastore_navigation_items = this.props.datastores.map(datastore =>
      <DatastoreNavigationItem
        key = {datastore.uid}
        datastore = {datastore}
        isActive = {datastore.uid == this.props.active_datastore}
      />
    )

    return (
      <div className="datastore-list-container">
        <div className="container-narrow container">
          <ul className="datastore-list">
            {datastore_navigation_items}
          </ul>
        </div>
      </div>
    )
  }
}

DatastoreNavigation.propTypes = {
  datastores: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    datastores: state.datastores,
    active_datastore: state.active_datastore
  }
}

export default connect(mapStateToProps)(DatastoreNavigation); // TODO/Reminder come back to add action
