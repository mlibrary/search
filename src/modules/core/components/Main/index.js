import React from 'react'

import SearchHeader from '../SearchHeader/'
import Feedback from '../Feedback/'
import Footer from '../Footer/'

import '../../../../stylesheets/main.css';

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SearchHeader />
        {this.props.children}
        <Feedback />
        <Footer />
      </React.Fragment>
    )
  }
}

export default Main
