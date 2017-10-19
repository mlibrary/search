import React from 'react'

import { Link } from 'react-router-dom'

import Header from '../Header/'
import Footer from '../Footer/'

import '../../../../stylesheets/main.css';

import {
  SiteMessage
} from '../../../core'

class Main extends React.Component {
  render() {
    return (
      <div>
        <SiteMessage>
          <div className="container container-medium">
            <p><span className="beta-tag tag">Beta</span>This is new Search. Learn about our <a href="https://docs.google.com/document/d/1B82UpB191M-09cgor0rZuszueCoHswIeue3A822vcIg/edit">Beta roadmap</a> and help us make improvements by <a href="https://umich.qualtrics.com/jfe/form/SV_9SH992ZSrUoTeIJ">taking our quick survey</a>.</p>
          </div>
        </SiteMessage>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Main
