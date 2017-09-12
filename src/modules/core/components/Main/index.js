import React from 'react'
import Header from '../Header/'
import Footer from '../Footer/'

import '../../../../stylesheets/main.css';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <FeedbackWidget />
        <Footer />
      </div>
    )
  }
}

const FeedbackWidget = () => (
  <a className="feedback-widget button" href="https://umich.qualtrics.com/SE/?SID=SV_4Ofx0wtEQhzDtKl">Give Feedback</a>
)

export default Main
