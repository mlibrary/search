import React, { Component } from 'react';
import prejudice from '../../prejudice'


class EmailAction extends Component {
  state = {
    email: '',
    sent: false,
    status: undefined
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handleSubmitCallback = (data) => {
    this.setState({ status: data.status })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({ sent: true })
    prejudice.instance.act('email', this.props.datastore.uid, this.state.email, this.handleSubmitCallback)
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
          <p>Email successfully sent to {this.state.email}</p>
          <button className="button-link underline green-text" onClick={this.handleCloseStatus}>Close</button>
        </div>
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
        <form className="lists-action-form" onSubmit={this.handleSubmit}>
          <div className="lists-action-field-container">
            <label htmlFor="emailAddress">Email address</label>
            <input id="emailAddress" type="email" required placeholder="uniqname@umich.edu" value={this.state.email} onChange={this.handleChange}/>
          </div>
          <input type="submit" value="Send email" className="button" />
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

export default EmailAction
