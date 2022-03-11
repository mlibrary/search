import React from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled'
import { withRouter } from 'react-router-dom'
import _ from 'underscore'
import { Button } from '@umich-lib/core'
import { Login } from '../../../profile'
import { FavoriteButton } from '../../../favorites'
import favorite from '../../favorite'

const FavoriteLogInButton = styled(Button)({
  marginRight: '0.5rem'
})

class FavoriteRecord extends React.Component {
  state = {
    promptLogin: false,
  }

  handleClick = (login) => {
    const {
      record,
      datastore,
      isFavorited
    } = this.props

    if (!login.authenticated) {
      this.setState({ promptLogin: true })
    } else {
      const data = {
        intent: isFavorited ? 'unfavorite' : 'favorite',
        datastore: datastore.uid,
        record: record,
        value: undefined, // No value (aka new tag value) when favoriting.
      }
      favorite(data) // Favorite this record with the API/Prejudice.
    }
  }

  renderAuthentication = (login) => {
    const { promptLogin } = this.state
    const { isFavorited } = this.props

    if (login.loading) {
      return <div style={{ width: '130px' }} className="placeholder placeholder-access placeholder-inline"></div>
    }

    if (promptLogin && !login.authenticated) {
      return (
        <div className="favorites-authentication">
          <FavoriteLogInButton
            small
            href={login.href}
          >Log in to use Favorites</FavoriteLogInButton>
          <Button
            small
            kind="secondary"
            aria-label="Dismiss log in to use favorite"
            onClick={() => this.setState({ promptLogin: false })}>Close</Button>
        </div>
      )
    }

    return (
      <FavoriteButton favorited={isFavorited} handleClick={() => this.handleClick(login)} />
    )
  }

  render() {
    if (this.props.disabled) {
      return null
    }

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
    isFavorited,
    disabled: state.favorites.disabled === true,
    datastore: _.findWhere(state.datastores.datastores, { uid: datastore })
  };
}

export default withRouter(connect(mapStateToProps)(FavoriteRecord))
