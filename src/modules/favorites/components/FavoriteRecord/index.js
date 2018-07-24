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
      if (msg.status_code === 'action.response.success') {
        this.setState({ 'favoriting': false })
      }
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

  render() {
    // TODO: This attribute doesn't exist yet. Update attribute name if necessary.
    const favorited = this.props.record.favorited ? true : false

    return (
      <FavoriteButton favorited={favorited} handleClick={this.handleClick} />
    )
  }
}

export default FavoriteRecord
