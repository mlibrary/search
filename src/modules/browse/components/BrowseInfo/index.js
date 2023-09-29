import React from 'react';
import { Anchor } from '../../../reusable';
import PropTypes from 'prop-types';

function BrowseInfo (props) {
  if (!['databases', 'onlinejournals'].includes(props.datastore.uid)) {
    return null;
  }

  return (
    <p>
      <Anchor to={`/${props.datastore.slug}/browse${document.location.search}`}>Browse all {props.datastore.name}</Anchor> alphabetically or by academic discipline.
    </p>
  );
}

BrowseInfo.propTypes = {
  datastore: PropTypes.object
};

export default BrowseInfo;
