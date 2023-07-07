import React from 'react';
import { Alert, Button } from '../../../reusable';
import { connect } from 'react-redux';
import { UserIsFlintAffiliated } from '../../../flint';
import PropTypes from 'prop-types';

class FlintAlerts extends React.Component {
  state = {
    closed: false
  };

  handleCloseButtonClick = () => {
    this.setState({ closed: true });
  };

  render () {
    const { datastore } = this.props;

    const alertMessages = {
      primo: 'U-M Flint users: You may not be able to access U-M Ann Arbor resources. For the best results use <a href="https://umich.primo.exlibrisgroup.com/discovery/search?vid=01UMICH_INST:FLINT">Thompson Library’s Search All</a> to search for articles.',
      databases: 'We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/az.php?a=all">Thompson Library’s database listing</a>.',
      onlinejournals: 'We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://umich.primo.exlibrisgroup.com/discovery/jsearch?vid=01UMICH_INST:FLINT">Thompson Library’s Search All</a> to search for articles.',
      website: 'We noticed you are affiliated with U-M Flint. For the best results use the <a href="https://libguides.umflint.edu/library">Thompson Library website</a>.'
    };

    if (this.state.closed || !Object.keys(alertMessages).includes(datastore)) {
      return null;
    }

    return (
      <UserIsFlintAffiliated>
        <Alert type='warning'>
          <span dangerouslySetInnerHTML={{ __html: alertMessages[datastore] }} />
          <Button
            kind='secondary'
            small
            onClick={() => {
              return this.handleCloseButtonClick();
            }}
          >
            Dismiss
          </Button>
        </Alert>
      </UserIsFlintAffiliated>
    );
  }
}

FlintAlerts.propTypes = {
  datastore: PropTypes.string
};

function mapStateToProps (state) {
  return {
    query: state.search.query,
    datastore: state.datastores.active
  };
}

export default connect(mapStateToProps)(FlintAlerts);
