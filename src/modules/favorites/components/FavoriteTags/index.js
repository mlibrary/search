import React from 'react'
import {
  Button,
  Tag,
  Modal
} from '../../../reusable'
import { Icon } from '../../../core'
import { FavoriteInputTag } from '../../../favorites';

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

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleAdd = () => {
    this.setState({ modalIsOpen: true })
    console.log('handleAdd')
  }

  render() {
    const { record, datastore } = this.props
    /*
      TODO:
        - Check if the record is favorited. If not, render null. favorited
          record state will be on the record data from Pride.
        - Check if Record has tags. The Tags will be on the records from Pride.
    */

    const tags = [
      'Ethnography',
      'Midterm Project',
      'Thesis'
    ] // TEMP placeholder to be an example.

    if (!tags) {
      return null
    }

    /*
      TODO:
        - To improve semantic relationships and accessibility, consider
          adding aria described by attribute to existing tags.
          It might be best to describe the SVG close button with the
          tag text.
        - Or add aria-label to the button and describe it
          as "Remove tag for [tag name]"
    */
    return (
      <div className="favorite-tags-container">
        <span className="favorite-tags-label">My Tags:</span>
        <ul className="favorite-tags">
        {tags.map((tag, i) => (
          <li key={i}><Tag onRemove={() => this.handleRemove(tag)}>{tag}</Tag></li>
        ))}
        </ul>

        <Button kind="tertiary" small onClick={this.handleAdd} className="favorites-add-tag"><Icon name="plus" />Add Tag</Button>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal}>
          <fieldset className="add-tag-fieldset">
            <label htmlFor="add-tag-input"><span className="add-tag-heading">Add Tag</span>To organize your saved items by keyword, project, or course.</label>
            <FavoriteInputTag htmlId="add-input-tag" tags={tags} />
          </fieldset>
          <Button className="favorites-add-tag-button">Add Tag</Button>
          <Button kind="tertiary" onClick={this.handleCloseModal}>Cancel</Button>
        </Modal>
      </div>
    )
  }
}

export default FavoriteTags
