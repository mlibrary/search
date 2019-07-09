/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  SPACING
} from '@umich-lib/core'
import {
  setA11yMessage
} from '../../../a11y'

class ShowAllChildren extends React.Component {
  state = {
    show: false
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })

    const a11yMessage = this.state.show ? `Showing fewer` : `showing all ${this.props.length}`
    this.props.setA11yMessage(`${a11yMessage} ${this.props.name}`)
  }

  render() {
    const length = this.props.length || 0
    const show = this.props.show || 1
    const hasShowHideButton = length > show
    const name = this.props.name || undefined
    const showFewerText = this.props.showFewerText || `Show fewer ${name ? name : ''}`
    const showAllText = this.props.showAllText || `Show all ${length} ${name ? name : ''}`
    const buttonText = `${this.state.show ? showFewerText : showAllText }`

    return (
      <React.Fragment>
        {this.props.children.map((child, index) => {
          if (this.state.show || (show > index)) {
            return child
          }

          return null
        })}
        {hasShowHideButton && (
          <Button
            css={{
              marginTop: SPACING['2XS']
            }}
            small
            onClick={this.handleShowToggleClick.bind(this)}
            aria-expanded={this.state.show}
          >
            {buttonText}
          </Button>
        )}
      </React.Fragment>
    )
  }
}

export default connect(null, { setA11yMessage })(ShowAllChildren)
