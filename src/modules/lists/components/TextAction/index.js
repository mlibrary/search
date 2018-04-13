import React, { Component } from 'react';
import config from '../../../../config'


class EmailAction extends Component {
  state = {
    text: '',
    sent: false,
    status: undefined
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value })
  }

  handleSubmitCallback = (data) => {
    console.log('data', data)

    this.setState({ status: data.status })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ sent: true })
    this.props.prejudice.act('text', this.props.datastore.uid, this.state.text, this.handleSubmitCallback)
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
          <p>Text successfully sent to {this.state.text}</p>
          <button className="button-link underline green-text" onClick={this.handleCloseStatus}>Close</button>
        </div>
      )
    } else if (status === 'Not logged in') {
      const loginRoot = config.loginUrl;
      const loginUrl = loginRoot + '?dest=' + encodeURIComponent(document.location.pathname + document.location.search)

      return (
        <a href={loginUrl} className="button u-margin-top-1"><b>Log in</b> to send text</a>
      )
    } else {
      <div className="alert alert-warning lists-action-alert">
        <p><b>Status:</b> {this.state.status}</p>
        <button className="button-link underline" onClick={this.handleCloseStatus}>Close</button>
      </div>
    }
  }

  renderForm = () => {
    const { status } = this.state

    if (!status) {
      return (
        <React.Fragment>
          <form className="lists-action-form" onSubmit={this.handleSubmit}>
            <div className="lists-action-field-container">
              <label htmlFor="phoneNumber">Phone number</label>
              <input id="phoneNumber" type="tel" required value={this.state.text} placeholder="000-000-0000" onChange={this.handleChange}/>
            </div>
            <input type="submit" value="Send text" className="button" />
          </form>
        </React.Fragment>
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

export default EmailAction
