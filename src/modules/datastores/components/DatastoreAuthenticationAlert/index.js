import React from 'react';
import { Alert, Button } from '../../../reusable'
import { connect } from 'react-redux';
import config from '../../../../config'

class DatastoreAuthenticationAlert extends React.Component {
  state = {
    closed: false
  }

  render() {
    const { profile, datastore } = this.props

    if (datastore) {
      if (profile.status && profile.status !== 'Logged in') {
        const loginRoot = config.loginUrl;
        const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

        return (
          <Alert type="warning" closed={this.state.closed}>
            <span><a href={loginUrl}><b>Log in</b></a> to view complete results based on your U-M affiliation and to save and request items. <Button kind="tertiary" onClick={() => this.setState({ closed: true })}><b>Hide</b></Button></span>
          </Alert>
        )
      }
    }

    return null
  }
}

function mapStateToProps(state) {
  return {
    datastore: state.datastores.active,
    profile: state.profile
  };
}

export default connect(mapStateToProps)(DatastoreAuthenticationAlert);
