import React from 'react'
import reqwest from 'reqwest'
import axios from 'axios'

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

    axios.get(presenceUrl)
      .then((response) => {
        if (response.data) {
          switch (response.data) {
            case 'available':
              this.setState({ status: 'online' })
              break;
            case 'unavailable':
              this.setState({ status: 'offline' })
              break;
            default:
              break;
          }
        }
      })
  }

  renderStatusIcon() {
    const { status } = this.state

    switch (status) {
      case 'online':
        return <span className="ask-a-librarian-online"><Icon name="comment" /></span>
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
      >{this.renderStatusIcon()}Ask a Librarian</button>
    )
  }
}

export default AskALibrarian
