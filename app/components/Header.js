import React from 'react'

export class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="site-header">
          <div className="container-fluid">
            <a href="http://umich.edu" className="site-brand-umich-block-m-logo focus-outline-white">
              <img src={require('../assets/images/umich_block_m.png')} alt="Go to the University of Michigan homepage"/>
            </a><a href="http://lib.umich.edu" className="site-brand-mlibrary-logo focus-outline-white">
              <img src={require('../assets/images/mlibrary_logo.png')} alt="Go to the University of Michigan Library homepage"/>
            </a>
            <nav className="navigation right">
              <ul className="navigation-list">
                <li>
                  <a href="http://github.com/mlibrary/falafel/" className="white-text">Search</a>
                </li>
                <li>
                  <a href="" className="white-text">Log In</a>
                </li>
              </ul>
            </nav>
            <div className="clearfix"></div>
          </div>
        </div>
      </header>
    )
  }
}
