import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  isDatastoreBrowseable
} from '../../../pride';

class BrowseInfo extends React.Component {
  render () {
    const { datastore } = this.props;

    if (isDatastoreBrowseable(datastore.uid)) {
      return (
        <p>
          <Link
            className='underline'
            to={`/${datastore.slug}/browse${document.location.search}`}
          >Browse all {datastore.name}
          </Link> alphabetically or by academic discipline.
        </p>
      );
    }

    return null;
  }
}

BrowseInfo.propTypes = {
  datastore: PropTypes.object
};

export default BrowseInfo;
