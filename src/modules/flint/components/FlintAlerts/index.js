/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const alertMessages = {
  primo: 'U-M Flint users: You may not be able to access U-M Ann Arbor resources. For the best results use <a href="https://umich.primo.exlibrisgroup.com/discovery/search?vid=01UMICH_INST:FLINT">Thompson Library’s Search All</a> to search for articles.',
  databases: 'We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/az.php?a=all">Thompson Library’s database listing</a>.',
  onlinejournals: 'We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://umich.primo.exlibrisgroup.com/discovery/jsearch?vid=01UMICH_INST:FLINT">Thompson Library’s Search All</a> to search for articles.',
  website: 'We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/library">Thompson Library website</a>.'
};

function FlintAlerts (props) {
  const [closed, setClosed] = useState(false);
  // Check if user is not affiliated with Flint, is not in one of the above datastores, or the Alert is closed
  if (
    !props.profile.institutions.includes('Flint') ||
    !Object.keys(alertMessages).includes(props.datastore) ||
    closed
  ) {
    return null;
  }

  const onClose = () => {
    setClosed(true);
  };

  return (
    <div
      className='alert alert--warning alert-inner'
      css={{
        gap: '1rem',
        justifyContent: 'center',
        marginTop: '-0.75rem'
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: alertMessages[props.datastore] }} />
      <button
        className='btn btn--small btn--secondary'
        onClick={onClose}
      >
        Dismiss
      </button>
    </div>
  );
};

FlintAlerts.propTypes = {
  profile: PropTypes.object,
  datastore: PropTypes.string
};

function mapStateToProps (state) {
  return {
    query: state.search.query,
    profile: state.profile,
    datastore: state.datastores.active
  };
}

export default connect(mapStateToProps)(FlintAlerts);
