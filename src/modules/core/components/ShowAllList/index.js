import React from 'react'

class ShowAllList extends React.Component {
  state = {
    show: false
  }

  handleShowToggleClick() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    const length = this.props.length || 0
    const show = this.props.show || 1
    const listClass = this.props.listClass || ''
    const hasShowHideButton = length > show

    return (
      <div>
        <ul className={listClass}>
          {this.props.children.map((child, index) => {
            if (this.state.show || (show > index)) {
              return child
            }

            return null
          })}
        </ul>
        {hasShowHideButton && (
          <ShowHideButton
            show={this.state.show}
            length={length}
            handleOnClick={this.handleShowToggleClick.bind(this)}
          />
        )}
      </div>
    )
  }
}

const ShowHideButton = ({ handleOnClick, show, length}) => {
  return (
    <button
      onClick={() => handleOnClick()}
      className="button-link-light">
      {show ? 'Show fewer' : 'Show all'}
    </button>
  )
}

export default ShowAllList
