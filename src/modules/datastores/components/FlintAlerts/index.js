import { Alert, Anchor } from '../../../reusable';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const FlintAlerts = ({ datastore, profile }) => {
  const [dismiss, setDismiss] = useState([]);
  const handleDismissClick = () => {
    setDismiss((previousDismiss) => {
      return [...previousDismiss, datastore];
    });
  };
  const messages = {
    databases: (<>We noticed you are affiliated with U-M Flint. For the best results use the <Anchor href='https://libguides.umflint.edu/az.php?a=all'>Thompson Library’s database listing</Anchor>.</>),
    onlinejournals: (<>We noticed you are affiliated with U-M Flint. For the best results use the <Anchor href='https://umich.primo.exlibrisgroup.com/discovery/jsearch?vid=01UMICH_INST:FLINT'>Thompson Library’s Search All</Anchor> to search for articles.</>),
    primo: (<>U-M Flint users: You may not be able to access U-M Ann Arbor resources. For the best results use <Anchor href='https://umich.primo.exlibrisgroup.com/discovery/search?vid=01UMICH_INST:FLINT'>Thompson Library’s Search All</Anchor> to search for articles.</>),
    website: (<>We noticed you are affiliated with U-M Flint. For the best results use the <Anchor href='https://libguides.umflint.edu/library'>Thompson Library website</Anchor>.</>)
  };

  if (!Object.keys(messages).includes(datastore) || !profile.institutions?.includes('Flint') || dismiss.includes(datastore)) {
    return null;
  }

  return (
    <Alert type='warning'>
      <div className='flex alert--flint'>
        <span>{messages[datastore]}</span>
        <button
          className='btn btn--small btn--secondary no-background'
          onClick={handleDismissClick}
        >
          Dismiss
        </button>
      </div>
    </Alert>
  );
};

FlintAlerts.propTypes = {
  datastore: PropTypes.string,
  profile: PropTypes.object
};

export default FlintAlerts;
