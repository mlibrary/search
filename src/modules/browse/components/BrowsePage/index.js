import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import {
  setDocumentTitle
} from '../../../a11y'
import {
  BrowseAtoZ,
  BrowseByFilters
} from '../../../browse'


class BrowsePage extends React.Component {
  render() {
    const {
      datastore,
      browse
    } = this.props;

    setDocumentTitle(['Browse', datastore.name])

    return (
      <div className="container container-narrow">
        <ol className="breadcrumbs">
          <li><Link to="/" className="underline">Search</Link></li>
          <li><Link to={`/${datastore.slug}`} className="underline">{datastore.name}</Link></li>
          <li>Browse</li>
        </ol>

        <h1>Browse {datastore.name}</h1>
        <p>When you're stuck looking for specific {datastore.name.toLowerCase()} or just want to see what's out there, the browse page makes finding the right {datastore.name.toLowerCase()} easy. Browse all {datastore.name.toLowerCase()} titles alphabetically or by academic discipline.</p>
        <BrowseAtoZ />

        <BrowseByFilters filters={browse} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    datastore: _.findWhere(state.datastores.datastores, { uid: state.datastores.active }),
    browse: state.browse[state.datastores.active]
  };
}

export default connect(mapStateToProps)(BrowsePage);
