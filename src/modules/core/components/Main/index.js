import React from 'react'

import { Link } from 'react-router-dom'

import Header from '../Header/'
import Footer from '../Footer/'

import '../../../../stylesheets/main.css';

import {
  SiteMessage,
  SkipToID
} from '../../../core'

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SkipToID id='search-box' name="search box" />
        <SiteMessage>
          <div className="container container-medium">
            <p><span className="beta-tag tag">Beta</span>This is new Search. Learn about our <Link to="/feature-road-map">feature road map</Link> and help us make improvements by <a href="https://umich.qualtrics.com/jfe/form/SV_9SH992ZSrUoTeIJ">providing feedback</a>.</p>
          </div>
        </SiteMessage>
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    )
  }
}

export default Main
