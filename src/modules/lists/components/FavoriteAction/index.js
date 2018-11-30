import React, { Component } from 'react';
import Button from '@umich-lib/button'
import ActionStatusMessage from '../ActionStatusMessage'
import { favoriteRecordsInList } from '../../../favorites'

class FavoriteAction extends Component {
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

    const {
      datastore
    } = this.props

    // Assume the favoriting was successful on the front-end.
    favoriteRecordsInList({ datastore })

    // Actually send the action to the back-end.
    this.props.prejudice.act(
      'favorite',
      datastore.uid,
      undefined,
      this.handleSubmitCallback
    )
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
          <Button type="submit">Save to Favorites</Button>
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
        <ActionStatusMessage status={this.state.status} action={action} />
        {this.renderForm()}
      </section>
    )
  }
}

export default FavoriteAction
