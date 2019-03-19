import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from '@umich-lib/core'
import ActionStatusMessage from '../ActionStatusMessage'
import {
  favoriteRecord,
  favoriteRecordsInList
} from '../../../favorites'

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
      datastore,
      record
    } = this.props

    // If a record is passed in as a prop, then only favorite that record, not the list.
    if (!record) {
      // Assume the favoriting was successful on the front-end. This favorites the records
      // in the Search state only. Not with Prejudice.
      favoriteRecordsInList({ datastore })
    } else {
      favoriteRecord({
        datastoreUid: datastore.uid,
        recordUid: record.uid
      })
    }

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
    const {
      listLength,
      action,
      disabled
    } = this.props

    if (disabled || listLength === 0) {
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

function mapStateToProps(state, ownProps) {
  return {
    disabled: state.favorites.disabled === true
  };
}

export default connect(mapStateToProps)(FavoriteAction)
