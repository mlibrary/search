import React from 'react';
import { connect } from 'react-redux';
import Header from '@umich-lib/header'
import config from '../../../../config'

class SearchHeader extends React.Component {
  render() {
    const loginRoot = config.loginUrl;
    const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)
    const logoutUrl = 'https://weblogin.umich.edu/cgi-bin/logout?' + document.location
    const loginText = this.props.isAuthenticated ? 'Log out' : 'Log in'
    const loginHref = this.props.isAuthenticated ? logoutUrl : loginUrl
    let navItems = [
      { text: 'My Account', href: 'https://www.lib.umich.edu/my-account/' },
      { text: 'My Favorites', href: 'https://www.lib.umich.edu/my-account/favorites' },
      { text: loginText, href: loginHref }
    ]

    if (this.props.favoritesDisabled) {
      navItems = [
        { text: 'My Account', href: 'https://www.lib.umich.edu/my-account/' },
        { text: loginText, href: loginHref }
      ]
    }

    return  (
      <div role="banner">
        <Header
          name="Search"
          className="search-header"
          url="/"
          nav={navItems}
          renderAnchor={(data) => (
            <a
              href={data.to}
              data-ga-action="Click"
              data-ga-category="Header"
              data-ga-label={data.text}
            >{data.text}</a>
          )}
        />
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.profile.status === 'Logged in',
    datastore: state.datastores.active,
    search: state.search,
    favoritesDisabled: state.favorites.disabled === true
  };
}

export default connect(mapStateToProps)(SearchHeader);
