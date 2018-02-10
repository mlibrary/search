import React from 'react'
import { Link } from 'react-router-dom'


class BrowseInfo extends React.Component {
  render() {
    const { datastore } = this.props;

    if (datastore.uid === 'databases' || datastore.uid === 'journals') {
      return (
        <p><Link className="underline" to={`/${datastore.slug}/browse`}>Browse All {datastore.name}</Link> alphabetically or by academic discipline.</p>
      )
    }

    return null
  }
}

export default BrowseInfo
