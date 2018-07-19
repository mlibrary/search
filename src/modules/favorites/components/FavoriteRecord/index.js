import React from 'react'
import { FavoriteButton } from '../../../favorites'
import favorite from '../../utils'

class FavoriteRecord extends React.Component {
  handleClick = () => {
    const { record, datastore } = this.props

    const callback = (msg) => {
      /*
        TODO:
          - Set loading/favoriting state
          - Catch callback.
            - If successful, change state to favorited.
            - If failure, send feedback it failed. Turn off loading state.
      */

      console.log('FavoriteRecord callback', msg) // TEMP
    }

    favorite({
      intent: 'favorite',
      datastore,
      record,
      value: undefined, // No value (aka new tag value) when favoriting.
      callback
    })
  }

  render() {
    // TODO: Check favorited based on state conditions.
    return (
      <FavoriteButton favorited={false} handleClick={this.handleClick} />
    )
  }
}

export default FavoriteRecord
