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
import {
  Breadcrumb
} from '../../../reusable'


class BrowsePage extends React.Component {
  render() {
    const {
      datastore,
      browse
    } = this.props;

    setDocumentTitle(['Browse', datastore.name])

    return (
      <div className="container container-narrow u-margin-top-1">
        <Breadcrumb
          items={[
            {text: `${datastore.name}`, to: `/${datastore.slug}${document.location.search}` },
            {text: 'Browse' }
          ]}
          renderAnchor={(item) => <Link to={item.to}>{item.text}</Link>}
        />

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
