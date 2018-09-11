import React from 'react';
import { connect } from 'react-redux';
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
        <Header
          name="Search"
          url="/"
          nav={[
            { text: 'My Account', href: 'https://www.lib.umich.edu/my-account/' },
            { text: 'My Favorites', href: 'https://www.lib.umich.edu/my-account/favorites' },
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
