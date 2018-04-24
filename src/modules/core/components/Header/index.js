import React from 'react';
import { Link } from 'react-router-dom'
import umichBlockM from './umich_block_m.png';
import {
  SiteMessage
} from '../../../core'
import {
  A11yLiveMessage,
} from '../../../a11y'

class Header extends React.Component {
  render() {
    return  (
      <header role="banner">
        <A11yLiveMessage />
        <SiteMessage>
          <div className="container container-medium">
            <p>We are dedicated to making Search as usable and accessible as possible for all users. If you are having trouble using this, <a href="https://umich.qualtrics.com/jfe/form/SV_bCwYIKueEXs8wBf">please let us know</a>. We will support access to <a href="">Mirlyn</a>, <a href="">ArticlesPlus</a>, and <a href="">Search Tools</a> until <b>July 30, 2018</b>. Learn about our <Link to="/feature-road-map">feature road map</Link>.</p>
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

              <a href="https://www.lib.umich.edu/my-account/" className="site-header-link">My Account</a>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
