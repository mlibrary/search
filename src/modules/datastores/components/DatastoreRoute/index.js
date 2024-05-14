import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import config from '../../../../config';
import { URLSearchQueryWrapper, getStateFromURL } from '../../../pride';
import { DatastorePage, NoMatch } from '../../../pages';

function DatastoreRoute () {
  const { datastoreSlug } = useParams();
  const location = useLocation();
  const { list } = config.datastores;
  const slugDs = list.find((datastore) => {
    return datastore.slug === datastoreSlug;
  });
  const uidDs = list.find((datastore) => {
    return datastore.uid === datastoreSlug;
  });
  const isDatastore = Boolean(slugDs || uidDs);
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
