import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Heading from '@umich-lib-ui/heading'
import Text from '@umich-lib-ui/text'
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

        <Heading size="xlarge" level={1}>Browse all {datastore.name}</Heading>
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
