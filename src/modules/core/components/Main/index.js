import React from 'react'

import Header from '../Header/'
import Feedback from '../Feedback/'
import Footer from '../Footer/'

import '../../../../stylesheets/main.css';

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <Feedback />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Main
