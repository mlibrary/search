import React from 'react';
import { Link } from 'react-router-dom'
import umichBlockM from './umich_block_m.png';
import { connect } from 'react-redux';
import { SiteMessage } from '../../../core'
import { Header } from '../../../reusable'
import config from '../../../../config'

class SearchHeader extends React.Component {
  render() {
    const loginRoot = config.loginUrl;
    const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)
    const logoutUrl = 'https://weblogin.umich.edu/cgi-bin/logout?' + document.location
    const loginText = this.props.isAuthenticated ? 'Log out' : 'Log in'
    const loginHref = this.props.isAuthenticated ? logoutUrl : loginUrl

    return  (
      <div role="banner">
        <SiteMessage>
          <div className="container container-medium">
            <p>U-M Library Search launched in July 2018. <a href="https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf">Please let us know if you have feedback</a>.</p>
          </div>
        </SiteMessage>

        <Header
          name="Search"
          url="/"
          nav={[
            { text: 'My Account', href: 'https://www.lib.umich.edu/my-account/' },
            { text: loginText, href: loginHref }
          ]}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.profile.status === 'Logged in',
    datastore: state.datastores.active,
    search: state.search
  };
}

export default connect(mapStateToProps)(SearchHeader);
