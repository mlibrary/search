import React from 'react';
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
    In mirlyn, does the record indicate if holdings are being loaded?
  */
  if (
    record.loadingHoldings ||
    (record.datastore === 'mirlyn' && !record.resourceAccess.length)
  ) {
    return (
      <div className='resource-access-container'>
        <div className='access-placeholder-container'>
          <div className='placeholder placeholder-access placeholder-inline' />
          <div className='placeholder placeholder-inline' />
        </div>
      </div>
    );
  }

  /*
    If you've made it this far, then ready to render.

    ContextProvider is required to send Context
    to ResourceAccess create a label for GA event.
  */
  return (
    <ContextProvider render={(context) => {
      return (
        <Holders
          record={record}
          context={context}
        />
      );
    }}
    />
  );
}

ResourceAccessContainer.propTypes = {
  record: PropTypes.object
};

export default ResourceAccessContainer;
