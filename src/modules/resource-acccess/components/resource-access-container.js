import React from 'react';
import ResourceAccessLoading from './resource-access-loading';
import Holders from './holders';
import { ContextProvider } from '../../reusable';
import PropTypes from 'prop-types';

function ResourceAccessContainer ({ record }) {
  /*
    Website datastore does not use ResourceAccess
  */
  if (record.datastore === 'website') {
    return null;
  }

  /*
    Does the record indicate if holdings are being loaded?
    This only matters with mirlyn aka catalog.
  */
  if (
    record.loadingHoldings ||
    (record.datastore === 'mirlyn' && record.resourceAccess.length === 0)
  ) {
    return <ResourceAccessLoading />;
  }

  /*
    If you've made it this far, then ready to render.

    ContextProvider is required to send Context
    to ResourceAccess create a label for GA event.
  */
  return (
    <ContextProvider render={(context) => {
      return (
        <ResourceAccess record={record} context={context} />
      );
    }}
    />
  );
}

ResourceAccessContainer.propTypes = {
  record: PropTypes.object
};

function ResourceAccess ({ record, context }) {
  return (
    <Holders
      record={record}
      createId={createId}
      context={context}
    />
  );
}

ResourceAccess.propTypes = {
  record: PropTypes.object,
  context: PropTypes.object
};

/*
  These need to be unique to the app for React to handle
  rendering properly.
*/
function createId (record, i) {
  return 'holder--' + record.datastore + record.uid + '-' + i;
}

export default ResourceAccessContainer;
