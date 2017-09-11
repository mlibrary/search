import React from 'react'

import { Icon } from '../../../core'

class AskALibrarian extends React.Component {
  handleClick() {
    window.open(
      "https://libraryh3lp.com/chat/umlibraryaskalibrarian@chat.libraryh3lp.com?skin=27279",
      "_blank",
      "resizable=1, height=420, width=360"
    )
  }

  render() {
    return (
      <button
        className="ask-a-librarian-button"
        aria-label="Open a new window to the Ask a Librarian service."
        onClick={this.handleClick}
      ><Icon name="forum" />Ask a Librarian</button>
    )
  }
}

export default AskALibrarian
