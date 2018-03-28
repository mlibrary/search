import React from 'react';
import { Link } from 'react-router-dom'
import MediaQuery from 'react-responsive';
import umichBlockM from './umich_block_m.png';

import {
  AskALibrarian
} from '../../../core'

class Header extends React.Component {
  render() {
    return  (
      <header className="site-header">
        <div className="container container-medium">
          <div className="site-header-container">
            <div className="site-heading">
              <ul className="logo-item-list">
                <li className="logo-block-m">
                  <a href="http://lib.umich.edu" className="logo-link">
                    <img src={umichBlockM} alt="Go to the University of Michigan Library homepage" />
                  </a>
                </li>
                <li className="logo-library"><Link to="/">Library</Link></li>
                <li className="logo-search">
                  <span>
                    <Link to="/">Search</Link>
                  </span>
                </li>
              </ul>
            </div>

            <MediaQuery minDeviceWidth={800}>
              {(matches) => {
                if (matches) {
                  return (
                    <Menu />
                  )
                } else {
                  return (
                    <details className="header-menu-small-screen-details">
                      <summary className="header-menu-small-screen-summary-button">Menu</summary>
                      <Menu />
                    </details>
                  )
                }
              }}
            </MediaQuery>
          </div>
        </div>
      </header>
    );
  }
};

const Menu = () => (
  <ul className="site-header-list">
    <li>
      <Link to="/how-to-use-search">How to Use Search</Link>
    </li>
    <li>
      <a href="https://www.lib.umich.edu/get-research-help">Get Help</a>
    </li>
    <li>
      <AskALibrarian />
    </li>
    <li>
      <a href="https://www.lib.umich.edu/my-account/">My Account</a>
    </li>
  </ul>
)

export default Header;
