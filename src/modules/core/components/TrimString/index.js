import React from 'react'

class TrimString extends React.Component {
  state = {
    show: false,
    trimlength: 240
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { string } = this.props

    if (string.length < this.state.trimlength) {
      return (
        <span>{string}</span>
      )
    }

    let displayString = null
    if (this.state.show) {
      displayString = string
    } else {
      displayString = `${string.substr(0, this.state.trimlength)}...`
    }

    return (
      <span>
        <span className="trim-string-text">{displayString}</span>
        <button
          onClick={() => this.handleShowToggleClick()}
          className="trim-string-button">
            {this.state.show ? 'Show less' : 'Show more'}
        </button>
      </span>
    )
  }
}

export default TrimString
