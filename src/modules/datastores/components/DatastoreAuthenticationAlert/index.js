import React from 'react';
import Alert from '@umich-lib-ui/alert'
import { connect } from 'react-redux';
import config from '../../../../config'

class DatastoreAuthenticationAlert extends React.Component {
  render() {
    const { profile, datastore } = this.props

    /*
      Flint librarians wanted this message for users that are:
        A) Not logged in and
        B) not on a U-M Ann Arbor or U-M Flint IP address.
    */
    if (datastore === 'articlesplus') {
      if (profile.status !== 'Logged in') {
        if (profile.institutions && profile.institutions.length === 0) {
          const loginRoot = config.loginUrl;
          const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

          return (
            <Alert intent="warning">
              <span><a href={loginUrl} style={{ textDecoration: 'underline', color: 'inherit' }}><b>Log in</b></a> to view complete search results and to save and request items.</span>
            </Alert>
          )
        }
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
