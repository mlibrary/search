import React, { Component } from 'react';

class FileAction extends Component {
  state = {
    sent: false,
    status: undefined
  }

  componentWillUnmount() {
    this.setState({status: undefined})
  }

  handleSubmitCallback = (data) => {
    this.setState({ status: data.status })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sent: true })
    this.props.prejudice.act('file', this.props.datastore.uid, 'export-ris', this.handleSubmitCallback)
  }

  handleCloseStatus = () => {
    this.props.setActive('')
    this.setState({ status: undefined, sent: false })
  }

  renderStatus = () => {
    const { status } = this.state


    if (!status) {
      return null
    }

    if (status === 'Success') {
      return (
        <div className="alert alert-success lists-action-alert">
          <p>Download successful.</p>
          <button className="button-link underline green-text" onClick={this.handleCloseStatus}>Close</button>
        </div>
      )
    } else {
      return (
        <div className="alert alert-warning lists-action-alert">
          <p><b>Status:</b> {this.state.status}</p>
          <button className="button-link underline" onClick={this.handleCloseStatus}>Close</button>
        </div>
      )
    }
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
        {this.renderStatus()}
        {this.renderForm()}
      </section>
    )
  }
}

export default FileAction
