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
    const string = this.props.string
    const trimLength = this.props.trim

    // TODO have two parts of the string trimmed to show more and less and not move the button.

    return (
      <span>
        {string}
        {this.state.show ? (
          {string}
        ) : (
          {string.trim(trimLength)}
        )}
        <ShowHideButton
          handleOnClick={handleShowToggleClick.bind(this)}
          show: this.state.show
        />
      </span>
    )
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
