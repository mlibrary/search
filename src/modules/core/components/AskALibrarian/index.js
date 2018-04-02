import React from 'react'
import axios from 'axios'
import Responsive from 'react-responsive';

import { Icon } from '../../../core'

class AskALibrarian extends React.Component {
  state = {
    open: false
  }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  handleSmallScreenClick = () => {
    window.open(
      "https://libraryh3lp.com/chat/umlibraryaskalibrarian@chat.libraryh3lp.com?skin=27279",
      "_blank",
      "resizable=1, height=420, width=360"
    )
  }

  componentDidMount() {
    const presenceUrl = 'https://libraryh3lp-com.proxy.lib.umich.edu/presence/jid/umlibraryaskalibrarian/chat.libraryh3lp.com/text'

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

  render() {
    if (this.state.status === 'online') {
      const openClass = this.state.open ? "chat-widget--opened" : ""
      const chatWidgetClasses = `chat-widget ${openClass}`

      return (
        <Responsive maxWidth={700}>
          {(matches) => {
            if (matches) {
              return (
                <button
                  className="chat-widget-button chat-widget-button--small-screens"
                  onClick={this.handleSmallScreenClick}
                  role="link"
                ><Icon name="comment" /><span>Ask a Librarian</span> </button>
              )
            } else {
              return (
                <div className={chatWidgetClasses}>
                  <button
                    className="chat-widget-button"
                    onClick={this.handleClick}
                  ><Icon name="comment" /><span>Ask a Librarian</span> </button>

                  <iframe src="https://libraryh3lp.com/chat/umlibraryaskalibrarian@chat.libraryh3lp.com?skin=27279" className="chat-widget-iframe"></iframe>
                </div>
              )
            }
          }}
        </Responsive>
      )
    }

    return null
  }
}

export default AskALibrarian
