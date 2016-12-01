import React from 'react'
import { Link } from 'react-router'

class DatastoreNavigationItem extends React.Component {
  render() {
    const { uid, name } = this.props.datastore
    const isActive = this.props.isActive

    return (
      <li className={ isActive ? 'active' : '' }>
        <Link to={`/${uid}`}>{name}</Link>
      </li>
    )
  }
}

DatastoreNavigationItem.propTypes = {
  datastore: React.PropTypes.object.isRequired,
  isActive: React.PropTypes.bool.isRequired
}

export default DatastoreNavigationItem;
