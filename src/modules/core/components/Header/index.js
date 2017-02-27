import React from 'react';

import umich_block_m from './umich_block_m.png';

class Header extends React.Component {
  constructor(props) {
        super(props);
        this.state = {party: false};
    }

    handlePartyParrot() {
        this.setState({party: !this.state.party });
    }
  render() {
    return  (
      <header className="site-header">
        <ul className="logo-item-list">
          <li className="logo-block-m">
            <a href="http://umich.edu" className="logo-link">
              <img src={umich_block_m} alt="Go to the University of Michigan Library homepage" />
            </a>
          </li>
          <li className="logo-library"><a href="http://lib.umich.edu">Library</a></li>
          <li className="logo-search">
            <span>
              <a href="/">Search</a>
              <sup
                className="party-parrot-container"
                onClick={this.handlePartyParrot.bind(this)}>BETA
                <img
                  src="http://cultofthepartyparrot.com/parrots/parrot.gif"
                  role="presentation"
                  className={`party-parrot ${this.state.party ? 'party' : ''}`}/>
              </sup>
            </span>
          </li>
        </ul>
      </header>
    );
  }
};

export default Header;
