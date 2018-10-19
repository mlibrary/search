import React from 'react'
import ReactGA from 'react-ga'

class GAPageView extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (process.env.NODE_ENV === 'production') {
      const path = this.props.location.pathname + this.props.location.search
      const nextPath = nextProps.location.pathname + nextProps.location.search
      const locationChanged = path !== nextPath

      if (locationChanged) {
        ReactGA.pageview(nextPath)
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default GAPageView