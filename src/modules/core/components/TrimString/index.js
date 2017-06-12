import React from 'react'

class TrimString extends React.Component {
  state = {
    show: false
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const { string } = this.props

    if (string.length < 200) {
      return (
        <span>{string}</span>
      )
    }

    let displayString = null
    if (this.state.show) {
      displayString = string
    } else {
      displayString = `${string.substr(0, 240)}...`
    }

    return (
      <span>
        {displayString}
        <button
          onClick={() => this.handleShowToggleClick()}
          className="trim-string-button">
            {this.state.show ? 'Less' : 'More'}
        </button>
      </span>
    )

    /*
    {this.state.show ? (
      {string}
    ) : (
      {string.trim(trimLength)}
    )}
    <ShowHideButton
      handleOnClick={handleShowToggleClick.bind(this)}
      show: this.state.show
    />
    */
  }
}

const ShowHideButton = ({ handleOnClick, show}) => {
  return (
    <button
      onClick={() => handleOnClick()}
      className="button-link-light">
      {show ? 'Less' : 'More'}
    </button>
  )
}

export default TrimString
