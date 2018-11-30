import React from 'react'
import { FavoriteButton } from '../../../favorites'
import { connect } from 'react-redux'
import favorite from '../../favorite'
import Button from '@umich-lib/button'
import { Login } from '../../../profile'
import styled from 'react-emotion'

const FavoriteLogInButton = styled(Button)({
  marginRight: '0.5rem'
})


class FavoriteRecord extends React.Component {
  state = {
    promptLogin: false,
  }

  handleClick = (login) => {
    const { record, datastore, isFavorited } = this.props

    if (!login.authenticated) {
      this.setState({ promptLogin: true })
    } else {
      const data = {
        intent: isFavorited ? 'unfavorite' : 'favorite',
        datastore,
        record: record,
        value: undefined, // No value (aka new tag value) when favoriting.
      }
      favorite(data) // Favorite this record with the API/Prejudice.
    }
  }

  renderAuthentication = (login) => {
    const { promptLogin } = this.state
    const { isFavorited } = this.props

    if (promptLogin) {
      return (
        <div className="favorites-authentication">
          <FavoriteLogInButton
            small
            href={login.href}
          >Log in to Favorite</FavoriteLogInButton>
          <Button
            small
            kind="secondary"
            aria-label="Dismiss log in to favorite"
            onClick={() => this.setState({ promptLogin: false })}>Close</Button>
        </div>
      )
    }

    return (
      <FavoriteButton favorited={isFavorited} handleClick={() => this.handleClick(login)} />
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

function mapStateToProps(state, ownProps) {
  const { record, datastore } = ownProps
  const isStateFavorited =
    state.favorites[datastore] &&
    state.favorites[datastore][record.uid] &&
    state.favorites[datastore][record.uid].favorited
  const isFavorited = isStateFavorited !== undefined ?
    isStateFavorited : record.favorite_tags

  // Is the record favorited (from Spectrum) on the record or
  // is it favorited in state (in current browser session by user)
  return {
    isFavorited
  };
}

export default connect(mapStateToProps)(FavoriteRecord)
