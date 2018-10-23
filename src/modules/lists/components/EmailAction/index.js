import React, { Component } from 'react';
import { connect } from 'react-redux';
import ActionError from '../ActionError'
import ReactGA from 'react-ga'

class EmailAction extends Component {
  state = {
    email: '',
    sent: false,
    status: undefined
  }

  componentDidMount() {
    const { email } = this.props.profile

    if (email) {
      this.setState({ email })
    }
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value })
  }

  handleSubmitCallback = (data) => {
    this.setState({ status: data })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ sent: true })

    // Is this being submitted from a record or a list
    if (this.props.record) {
      ReactGA.event({
        action: 'Click',
        category: 'Actions',
        label: 'Use Email from record'
      })
    } else {
      ReactGA.event({
        action: 'Click',
        category: 'Actions',
        label: 'Use Email from list'
      })
    }

    this.props.prejudice.act('email', this.props.datastore.uid, this.state.email, this.handleSubmitCallback)
  }

  handleCloseStatus = () => {
    this.props.setActive('')
    this.setState({ status: undefined, sent: false })
  }

  renderForm = () => {
    const { status } = this.state

    if (!status || status.status_code !== 'action.response.success') {
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
    const { listLength, action } = this.props

    if (listLength === 0) {
      return null
    }

    return (
      <section className="lists-action">
        <ActionError status={this.state.status} action={action} handleCloseStatus={this.handleCloseStatus} />
        {this.renderForm()}
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default connect(mapStateToProps)(EmailAction);
