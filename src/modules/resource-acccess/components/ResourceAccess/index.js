import React from 'react';
import Holders from '../Holders';
import { ContextProvider } from '../../../reusable';
import PropTypes from 'prop-types';

function ResourceAccess ({ record }) {
  const { datastore, loadingHoldings, resourceAccess } = record;

  if (datastore === 'website') return null;

  if (loadingHoldings || (datastore === 'mirlyn' && !resourceAccess.length)) {
    return (
      <div className='resource-access-container'>
        <div className='access-placeholder-container'>
          <div className='placeholder placeholder-access placeholder-inline' />
          <div className='placeholder placeholder-inline' />
        </div>
      </div>
    );
  }

  return (
    <ContextProvider render={(context) => {
      return <Holders {...{ record, context}} />;
    }} />
  );
}

ResourceAccess.propTypes = {
  record: PropTypes.object
};

export default ResourceAccess;
