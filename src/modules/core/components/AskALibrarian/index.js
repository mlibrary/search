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
    const presenceUrl = 'https://libraryh3lp-com.proxy.lib.umich.edu/presence/jid/umlibraryaskalibrarian/chat.libraryh3lp.com/text'

    // TODO: Get status of chat service and set online state as 'online' or 'offline'

    reqwest({
      url: presenceUrl,
      method: 'get',
      success: (msg) => { console.log('success': msg) }
    })
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

  renderStatusIcon() {
    const { status } = this.props

    switch (status) {
      case 'online':
        return <Icon name="comment" />
      case 'offline':
        return <Icon name="comment-remove-outline" />
      default:
        return <Icon name="comment-outline" />
    }
  }

  render() {
    return (
      <button
        className="ask-a-librarian-button"
        aria-label="Open a new window to the Ask a Librarian service."
        onClick={this.handleClick}
      >{this.renderStatusIcon()}Ask a Librarian{this.renderStatus()}</button>
    )
  }
}

export default AskALibrarian
