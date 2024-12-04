import { getStateFromURL, URLSearchQueryWrapper } from '../../../pride';
import { useLocation, useParams } from 'react-router-dom';
import config from '../../../../config';
import { NoMatch } from '../../../pages';
import React from 'react';

const DatastoreRoute = () => {
  const { datastoreSlug } = useParams();
  const location = useLocation();
  const isDatastore = config.datastores.list.some(({ slug, uid }) => {
    return [slug, uid].includes(datastoreSlug);
  });
  const urlState = getStateFromURL({ location });

  return isDatastore && urlState ? <URLSearchQueryWrapper /> : <NoMatch />;
};

export default DatastoreRoute;
