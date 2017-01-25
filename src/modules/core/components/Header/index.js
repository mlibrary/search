import React from 'react';

const Header = function Header() {
  return (
    <header>
      <div className="site-header">
        <div className="container-fluid">
          <a href="http://umich.edu" className="site-brand-umich-block-m-logo focus-outline-white">
            <img src={require('./umich_block_m.png')} alt="Go to the University of Michigan homepage" />
          </a><a href="http://lib.umich.edu" className="site-brand-mlibrary-logo focus-outline-white">
            <img src={require('./mlibrary_logo.png')} alt="Go to the University of Michigan Library homepage" />
          </a>
          <nav className="navigation right">
            <ul className="navigation-list">
              <li>
                Search
              </li>
            </ul>
          </nav>
          <div className="clearfix" />
        </div>
      </div>
    </header>
  );
};

export default Header;
