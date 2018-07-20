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
            <p>We are dedicated to making Search as usable and accessible as possible for all users. If you are having trouble using this site, <a href="https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf">please let us know</a>. We will support access to <a href="http://mirlyn.lib.umich.edu/">Mirlyn</a>, <a href="https://www.lib.umich.edu/articles/search">ArticlesPlus</a>, <a href="https://www.lib.umich.edu/searchtools">Search Tools</a>, and <a href="https://www.lib.umich.edu/">MLibrary Search</a> until <b>July 30, 2018</b>. Learn about our <Link to="/feature-road-map">feature road map</Link>.</p>
          </div>
        </SiteMessage>

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
    isAuthenticated: state.profile.status === 'Logged in'
  };
}

export default connect(mapStateToProps)(SearchHeader);
