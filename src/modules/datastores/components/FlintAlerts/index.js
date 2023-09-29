import React, { useState } from 'react';
import { Anchor, Button } from '../../../reusable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function FlintAlerts (props) {
  const [closed, setClosed] = useState(false);
  const datastores = ['primo', 'databases', 'onlinejournals', 'website'];

  if (!datastores.includes(props.datastore) || !props.profile.institutions?.includes('Flint') || closed) {
    return null;
  }

  return (
    <div
      className='alert alert--warning alert-inner'
      style={{
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '-0.75rem'
      }}
    >
      <span>
        {props.datastore === datastores[0] && <>U-M Flint users: You may not be able to access U-M Ann Arbor resources. For the best results use <Anchor href='https://umich.primo.exlibrisgroup.com/discovery/search?vid=01UMICH_INST:FLINT'>Thompson Library’s Search All</Anchor> to search for articles.</>}
        {props.datastore === datastores[1] && <>We noticed you are affiliated with U-M Flint. For the best results use the <Anchor href='https://libguides.umflint.edu/az.php?a=all'>Thompson Library’s database listing</Anchor>.</>}
        {props.datastore === datastores[2] && <>We noticed you are affiliated with U-M Flint. For the best results use the <Anchor href='https://umich.primo.exlibrisgroup.com/discovery/jsearch?vid=01UMICH_INST:FLINT'>Thompson Library’s Search All</Anchor> to search for articles.</>}
        {props.datastore === datastores[3] && <>We noticed you are affiliated with U-M Flint. For the best results use the <Anchor href='https://libguides.umflint.edu/library'>Thompson Library website</Anchor>.</>}
      </span>
      <Button
        kind='secondary'
        small
        onClick={(event) => {
          event.preventDefault();
          setClosed(true);
        }}
      >
        Dismiss
      </Button>
    </div>
  );
}

FlintAlerts.propTypes = {
  profile: PropTypes.object,
  datastore: PropTypes.string
};

function mapStateToProps (state) {
  return {
    profile: state.profile
  };
}

export default connect(mapStateToProps)(FlintAlerts);
