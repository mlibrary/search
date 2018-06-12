import React from 'react'

class TrimString extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      show: false,
      trimLength: this.props.trimLength || 240,
      showMore: this.props.showMore === false ? false : true
    }

    this.handleShowToggleClick = this.handleShowToggleClick.bind(this)
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { string } = this.props

    if (string.length < this.state.trimLength) {
      return (
        <span>{string}</span>
      )
    }

    let displayString = null
    if (this.state.show) {
      displayString = string
    } else {
      displayString = `${string.substr(0, this.state.trimLength)}...`
    }

    if (!this.state.showMore) {
      return (
        <span className="trim-string-text">{displayString}</span>
      )
    }

    return (
      <span>
        <span className="trim-string-text">{displayString}</span>
        {this.props.expandable && (
          <button
            onClick={() => this.handleShowToggleClick()}
            className="trim-string-button">
              {this.state.show ? 'Show less' : 'Show more'}
          </button>
        )}
      </span>
    )
  }
}

export default TrimString
