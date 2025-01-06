import { Anchor } from '../../../reusable';
import React from 'react';

const BrowseInfo = ({ datastore }) => {
  if (!['databases', 'onlinejournals'].includes(datastore.uid)) {
    return null;
  }

  return (
    <p>
      <Anchor to={`/${datastore.slug}/browse${document.location.search}`}>Browse all {datastore.name}</Anchor> alphabetically or by academic discipline.
    </p>
  );
};

export default BrowseInfo;
