import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { isSlugADatastore, URLSearchQueryWrapper, getStateFromURL } from '../../../pride';
import { NoMatch, DatastorePage } from '../../../pages';

function DatastoreRoute () {
  const { datastoreSlug } = useParams();
  const location = useLocation();
  const isDatastore = isSlugADatastore(datastoreSlug);
  const urlState = getStateFromURL({ location });

  if (isDatastore && urlState) {
    return (
      <URLSearchQueryWrapper>
        <DatastorePage datastoreSlug={datastoreSlug} />
      </URLSearchQueryWrapper>
    );
  }

  return <NoMatch />;
}

export default DatastoreRoute;
