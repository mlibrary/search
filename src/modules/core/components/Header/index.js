import React from 'react';
import { Link } from 'react-router';

import umich_block_m from './umich_block_m.png';
import mlibrary_logo from './mlibrary_logo.png';

const Header = function Header() {
  return (
    <header className="site-header">
      <div className="container-fluid">
        <a href="http://umich.edu" className="umich-link">
          <img src={umich_block_m} alt="Go to the University of Michigan homepage" />
        </a>
        <a href="http://lib.umich.edu" className="mlibrary-link">
          <img src={mlibrary_logo} alt="Go to the University of Michigan Library homepage" />
        </a>
        <nav className="navigation">
          <ul className="navigation-list">
            <li className="navigation-item">
              <Link to="/" className="white-text">Search</Link>
            </li>
          </ul>
        </nav>
        <div className="clearfix"></div>
      </div>
    </header>
  );
};

export default Header;
