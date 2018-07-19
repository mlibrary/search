import React from 'react'
import {
  Button,
  Tag
} from '../../../reusable'
import { Icon } from '../../../core'


class FavoriteTags extends React.Component {
  handleRemove = (tag) => {
    /*
      TODO:
        - Tell Prejudice to remove tag.
        - Removing the tag from state.
    */

    console.log('handleRemove', tag)
  }

  handleAdd = () => {
    /*
      TODO:
        - Open modal to add tag.
    */

    console.log('handleAdd')
  }

  render() {
    const { record, datastore } = this.props
    /*
      TODO:
        - Check if the record is favorited. If not, render null.
        - Get tags from Prejudice and store them in state.
        - Get record tags from state.
    */

    const tags = [
      'Ethnography',
      'Midterm Project',
      'Thesis'
    ] // TEMP placeholder to be an example.

    if (!tags) {
      return null
    }

    return (
      <div className="favorite-tags-container">
        <span className="favorite-tags-label">My Tags:</span>
        <ul className="favorite-tags">
        {tags.map((tag, i) => (
          <li key={i}><Tag onRemove={() => this.handleRemove(tag)}>{tag}</Tag></li>
        ))}
        </ul>

        <Button kind="tertiary" small onClick={this.handleAdd} className="favorites-add-tag"><Icon name="plus" />Add Tag</Button>
      </div>
    )
  }
}

export default FavoriteTags
