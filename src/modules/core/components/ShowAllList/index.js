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
    const innerShowHideButtonText = `${this.state.show ? 'Show fewer' : 'Show all'} ${name ? name : ''}`

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
          <ShowHideButton handleOnClick={this.handleShowToggleClick.bind(this)}>
            {innerShowHideButtonText}
          </ShowHideButton>
        )}
      </div>
    )
  }
}

class ShowHideButton extends React.Component {
  render() {
    return (
      <button onClick={() => this.props.handleOnClick()} className="button-link-light">
        {this.props.children}
      </button>
    )
  }
}

export default ShowAllList
