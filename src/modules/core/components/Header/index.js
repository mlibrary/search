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
            <p><span className="beta-tag tag">Beta</span>This is new Search. Learn about our <Link to="/feature-road-map">feature road map</Link> and help us make improvements by <a href="https://umich.qualtrics.com/jfe/form/SV_9SH992ZSrUoTeIJ">providing feedback</a>.</p>
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
