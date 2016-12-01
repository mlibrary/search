import React from 'react'

import Header from './Header'

require("../assets/stylesheets/main.scss")

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    )
  }
}

export default Main
