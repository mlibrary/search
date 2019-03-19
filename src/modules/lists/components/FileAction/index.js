import React, { Component } from 'react';
import ReactGA from 'react-ga'
import { Button } from '@umich-lib/core'

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

    // Is this being submitted from a record or a list
    if (this.props.record) {
      ReactGA.event({
        action: 'Click',
        category: 'Actions',
        label: 'Use Export RIS from record'
      })
    } else {
      ReactGA.event({
        action: 'Click',
        category: 'My List',
        label: 'Use Export RIS from list'
      })
    }
    
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
          <Button type="submit">Download</Button>
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
