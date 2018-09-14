import React from 'react'
import { FavoriteButton } from '../../../favorites'
import favorite from '../../favorite'
import { Button, Modal } from '../../../reusable'
import { Login } from '../../../profile'


class FavoriteRecord extends React.Component {
  state = {
    favoriting: false,
    promptLogin: false,
  }

  handleClick = (login) => {
    const { record, datastore } = this.props

    if (!login.authenticated) {
      this.setState({ promptLogin: true })
    } else {
      const callback = (msg) => {
        /*
          TODO:
            - Send feedback alert about not successfully favoriting.
        */

        setTimeout(() => {
          this.setState({ 'favoriting': false })
        }, 1000)
      }

      // Only favorite if not already trying to change record favorite state.
      if (!this.state.favoriting) {
        const data = {
          intent: record.favorited ? 'unfavorite' : 'favorite',
          datastore,
          record: record,
          value: undefined, // No value (aka new tag value) when favoriting.
          callback
        }

        console.log('favorite action', data)

        favorite(data) // Favorite this record with the API/Prejudice.
      }

      this.setState({ 'favoriting': true })
    }
  }

  favoriting = (favoriting) => {
    setTimeout(() => {
      this.setState({ favoriting })
    }, 1000)
  }

  renderAuthentication = (login) => {
    const { favoriting, promptLogin } = this.state
    const { record } = this.props

    if (promptLogin) {
      return (
        <div className="favorites-authentication">
          <Button
            small
            className="favorites-authentication-button"
            href={login.href}
          ><b>Log in</b> to Favorite</Button>
          <Button
            small
            kind="tertiary"
            aria-label="Dismiss log in to favorite"
            onClick={() => this.setState({ promptLogin: false })}>Close</Button>
        </div>
      )
    }

    const favorited = record.favorited || favoriting ? true : false
    return (
      <FavoriteButton favorited={favorited} handleClick={() => this.handleClick(login)} />
    )
  }

  render() {
    return (
      <Login render={login => (
        <React.Fragment>{this.renderAuthentication(login)}</React.Fragment>
      )} />
    )
  }
}

export default FavoriteRecord
