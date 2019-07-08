import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Text,
  Heading,
  Breadcrumb,
  BreadcrumbItem
} from '@umich-lib/core'
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
      <div className="container container-narrow u-margin-top-1">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to={`/${datastore.slug}${document.location.search}`}>
              {datastore.name}
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Browse</BreadcrumbItem>
        </Breadcrumb>

        <Heading size="3XL" level={1}>Browse all {datastore.name}</Heading>
        <Text lede>When you're stuck looking for specific {datastore.name.toLowerCase()} or just want to see what's out there, the browse page makes finding the right {datastore.name.toLowerCase()} easy. Browse all {datastore.name.toLowerCase()} titles alphabetically or by academic discipline.</Text>
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
