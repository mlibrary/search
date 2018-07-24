import React from 'react'
import { FavoriteButton } from '../../../favorites'
import favorite from '../../favorite'

class FavoriteRecord extends React.Component {
  state = {
    favoriting: false
  }

  handleClick = () => {
    const { record, datastore } = this.props

    const callback = (msg) => {
      /*
        TODO:
          - Send feedback alert about not successfully favoriting.
      */

      setTimeout(() => {
        this.setState({ 'favoriting': false })
      }, 1000)
    }

    // Only favorite if not already trying to favorite.
    if (!this.state.favoriting) {
      favorite({
        intent: 'favorite',
        datastore,
        record,
        value: undefined, // No value (aka new tag value) when favoriting.
        callback
      })
    }

    this.setState({ 'favoriting': true })
  }

  favoriting = (favoriting) => {
    setTimeout(() => {
      this.setState({ favoriting })
    }, 1000)
  }

  render() {
    const { favoriting } = this.state
    const { record } = this.props

    /*
      Record favorited attribute doesn't exist yet. Update attribute name if
      necessary. We will show favorited when favoriting and assume it will go
      well to give instant feedback to user.
    */
    const favorited = record.favorited || favoriting ? true : false

    return (
      <FavoriteButton favorited={favorited} handleClick={this.handleClick} />
    )
  }
}

export default FavoriteRecord
