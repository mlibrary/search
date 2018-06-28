import React from 'react';
import { Link } from 'react-router-dom'
import umichBlockM from './umich_block_m.png';
import { connect } from 'react-redux';
import {
  SiteMessage
} from '../../../core'
import config from '../../../../config'

class Header extends React.Component {
  render() {
    const loginRoot = config.loginUrl;
    const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)
    const logoutUrl = 'https://weblogin.umich.edu/cgi-bin/logout?' + document.location
    const loginText = this.props.isAuthenticated ? 'Log out' : 'Log in'
    const loginHref = this.props.isAuthenticated ? logoutUrl : loginUrl

    return  (
      <header role="banner">
        <SiteMessage>
          <div className="container container-medium">
            <p>We are dedicated to making Search as usable and accessible as possible for all users. If you are having trouble using this site, <a href="https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf">please let us know</a>. We will support access to <a href="http://mirlyn.lib.umich.edu/">Mirlyn</a>, <a href="https://www.lib.umich.edu/articles/search">ArticlesPlus</a>, <a href="https://www.lib.umich.edu/searchtools">Search Tools</a>, and <a href="https://www.lib.umich.edu/">MLibrary Search</a> until <b>July 30, 2018</b>. Learn about our <Link to="/feature-road-map">feature road map</Link>.</p>
          </div>
        </SiteMessage>
        <div className="site-header">
          <div className="container container-medium">
            <div className="site-header-container">
              <div className="site-heading">
                <ul className="logo-item-list">
                  <li className="logo-block-m">
                    <a href="http://umich.edu" className="logo-link">
                      <img src={umichBlockM} alt="Go to the University of Michigan Library homepage" />
                    </a>
                  </li>
                  <li className="logo-library"><a href="https://www.lib.umich.edu">Library</a></li>
                  <li className="logo-search">
                    <span>
                      <Link to="/">Search</Link>
                    </span>
                  </li>
                </ul>
              </div>

              <ul className="site-header-nav">
                <li>
                  <a href={loginHref} className="site-header-link">{loginText}</a>
                </li>
                <li>
                  <a href="https://www.lib.umich.edu/my-account/" className="site-header-link">My Account</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.profile.status === 'Logged in'
  };
}

export default connect(mapStateToProps)(Header);
