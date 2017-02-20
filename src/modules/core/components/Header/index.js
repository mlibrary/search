import React from 'react';

import umich_block_m from './umich_block_m.png';

const Header = function Header() {
  return (
    <header className="site-header">
      <ul className="logo-item-list">
        <li className="logo-block-m">
          <a href="http://umich.edu" className="logo-link">
            <img src={umich_block_m} alt="Go to the University of Michigan Library homepage" />
          </a>
        </li>
        <li className="logo-library"><a href="http://lib.umich.edu">Library</a></li>
        <li className="logo-search"><a href="/">Search</a></li>
      </ul>
    </header>
  );
};

export default Header;
