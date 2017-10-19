import React from 'react';
import { Link } from 'react-router-dom'

import mlibLogo from './mlib_logo.png';

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
                    <img src={mlibLogo} alt="Go to the University of Michigan Library homepage" />
                  </a>
                </li>
                <li className="logo-library"><Link to="/">Search</Link></li>
                <li className="logo-search">
                  <span>
                    <Link to="/">Mirlyn</Link>
                  </span>
                </li>
              </ul>
            </div>

            <ul className="site-header-list">
              <li>
                <Link to="/how-to-use-search">How to Use Search</Link>
              </li>
              <li>
                <a href="https://www.lib.umich.edu/get-help">Get Help</a>
              </li>
              <li>
                <AskALibrarian />
              </li>
              <li>
                <a href="https://www.lib.umich.edu/my-account/">My Account</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
