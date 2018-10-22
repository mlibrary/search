import React, { Component } from 'react';
import ReactGA from 'react-ga'

class FileAction extends Component {
  state = {
    sent: false,
    status: undefined
  }

  componentWillUnmount() {
    this.setState({status: undefined})
  }

  handleSubmitCallback = (data) => {
    this.setState({ status: data })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sent: true })

    ReactGA.event({
      action: 'Click',
      category: 'My List',
      label: 'Use Export RIS from list'
    })
    
    this.props.prejudice.act('file', this.props.datastore.uid, 'export-ris', this.handleSubmitCallback)
  }

  handleCloseStatus = () => {
    this.props.setActive('')
    this.setState({ status: undefined, sent: false })
  }

  renderForm = () => {
    const { status } = this.state

    if (!status) {
      return (
        <form className="lists-action-form" onSubmit={this.handleSubmit}>
          <input type="submit" value="Download" className="button" />
        </form>
      )
    }

    return null
  }

  render() {
    const { listLength } = this.props

    if (listLength === 0) {
      return null
    }

    return (
      <section className="lists-action">
        {this.renderForm()}
      </section>
    )
  }
}

export default FileAction
