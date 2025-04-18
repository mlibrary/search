import { ContextProvider } from '../../../reusable';
import Holders from '../Holders';
import React from 'react';

const ResourceAccess = ({ record }) => {
  const { datastore, loadingHoldings, resourceAccess } = record;

  if (datastore === 'website') {
    return null;
  }

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
      return <Holders {...{ context, record }} />;
    }}
    />
  );
};

export default ResourceAccess;
