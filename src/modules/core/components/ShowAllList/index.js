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
    const name = this.props.name || undefined
    const showFewerText = this.props.showFewerText || `Show fewer ${name ? name : ''}`
    const showAllText = this.props.showAllText || `Show all ${length} ${name ? name : ''}`
    const buttonText = `${this.state.show ? showFewerText : showAllText }`

    return (
      <div className='show-all-list-container'>
        <ul className={listClass}>
          {this.props.children.map((child, index) => {
            if (this.state.show || (show > index)) {
              return child
            }

            return null
          })}
        </ul>
        {hasShowHideButton && (
          <ShowHideButton handleOnClick={this.handleShowToggleClick.bind(this)}>
            {buttonText}
          </ShowHideButton>
        )}
      </div>
    )
  }
}

class ShowHideButton extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.handleOnClick()} className="button-link-light show-all-button font-small">
        {this.props.children}
      </button>
    )
  }
}

export default ShowAllList
