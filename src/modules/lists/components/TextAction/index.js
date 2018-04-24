import React, { Component } from 'react';
import ActionError from '../ActionError'

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

  renderForm = () => {
    const { status } = this.state

    if (!status) {
      return (
        <React.Fragment>
          <form className="lists-action-form" onSubmit={this.handleSubmit}>
            <div className="lists-action-field-container">
              <label htmlFor="phoneNumber">Phone number</label>
              <input id="phoneNumber" type="tel" required value={this.state.text} onChange={this.handleChange}/>
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
        <ActionError status={this.state.status} handleCloseStatus={this.handleCloseStatus} />
        {this.renderForm()}
      </section>
    )
  }
}

export default EmailAction
