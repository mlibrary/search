import React from 'react'
import {
  Button,
  Tag,
  Modal
} from '../../../reusable'
import { Icon } from '../../../core'

class FavoriteTags extends React.Component {
  state = {
    modalIsOpen: false
  }

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

    this.setState({ modalIsOpen: true })
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

        <Modal isOpen={this.state.modalIsOpen}>
          <h2 className="add-tags-heading">Add Tags</h2>
          <p>Tagging helps organize your saved items by keyword, project, or course.</p>
          <fieldset>
            <input type="text" />
          </fieldset>
          <Button className="favorites-add-tag-button">Add Tag</Button>
          <Button kind="tertiary" onClick={() => this.setState({ modalIsOpen: false })}>Cancel</Button>
        </Modal>
      </div>
    )
  }
}

export default FavoriteTags
