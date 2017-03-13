import React from 'react';
import { IndexLink } from 'react-router';

import umichBlockM from './umich_block_m.png';
import parrot from './parrot.gif';

class Header extends React.Component {
  state = {
    isParty: false
  }

  handleParty = () => {
    this.setState({
      isParty: !this.state.isParty
    });
  }

  render() {
    return  (
      <header className="site-header">
        <div className="site-header-container">
          <div className="site-heading">
            <ul className="logo-item-list">
              <li className="logo-block-m">
                <a href="http://umich.edu" className="logo-link">
                  <img src={umichBlockM} alt="Go to the University of Michigan Library homepage" />
                </a>
              </li>
              <li className="logo-library"><a href="http://lib.umich.edu">Library</a></li>
              <li className="logo-search">
                <span>
                  <IndexLink to="/">Search</IndexLink>
                  <sup
                    className="party-parrot-container"
                    onClick={this.handleParty}>BETA
                    <img
                      src={parrot}
                      role="presentation"
                      className={`party-parrot ${this.state.isParty ? 'party' : ''}`}/>
                  </sup>
                </span>
              </li>
            </ul>
          </div>

          <ul className="site-header-list">
            <li>
              <a href="https://www.lib.umich.edu/my-account/">My Account</a>
            </li>
          </ul>
        </div>
      </header>
    );
  }
};

export default Header;
