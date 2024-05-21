import { DatastorePage, NoMatch } from '../../../pages';
import { getStateFromURL, URLSearchQueryWrapper } from '../../../pride';
import { useLocation, useParams } from 'react-router-dom';
import config from '../../../../config';
import React from 'react';

const DatastoreRoute = () => {
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
};

export default DatastoreRoute;
