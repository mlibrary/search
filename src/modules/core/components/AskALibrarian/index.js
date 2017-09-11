import React from 'react'
import reqwest from 'reqwest'

import { Icon } from '../../../core'

class AskALibrarian extends React.Component {
  state = {}

  handleClick() {
    window.open(
      "https://libraryh3lp.com/chat/umlibraryaskalibrarian@chat.libraryh3lp.com?skin=27279",
      "_blank",
      "resizable=1, height=420, width=360"
    )
  }

  componentDidMount() {
    /*
    const queue = 'umlibraryaskalibrarian'
    const presenceUrl = 'http://libraryh3lp.com/presence/jid/' + queue + '/chat.libraryh3lp.com/xml'
    */
    
    // TODO: Get status of chat service and set online state as true or false
  }

  renderStatus() {
    if (this.state.online === undefined) {
      return null
    }

    if (this.state.online) {
      return (
        <sup className="ask-a-librarian-status">active</sup>
      )
    } else {
      return (
        <sup className="ask-a-librarian-status ask-a-librarian-offline">away</sup>
      )
    }
  }

  render() {
    return (
      <button
        className="ask-a-librarian-button"
        aria-label="Open a new window to the Ask a Librarian service."
        onClick={this.handleClick}
      >Ask a Librarian{this.renderStatus()}</button>
    )
  }
}

export default AskALibrarian
