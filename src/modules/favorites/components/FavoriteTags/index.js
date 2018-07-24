import React from 'react'
import {
  Button,
  Tag,
  Modal
} from '../../../reusable'
import { Icon } from '../../../core'
import { FavoriteInputTag } from '../../../favorites';
import favorite from '../../favorite'

class FavoriteTags extends React.Component {
  state = {
    modalIsOpen: false,
    tag: ""
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true })
  }

  handleRemoveTag = (tag) => {
    this.handleTag(tag, 'untag')
  }

  handleAddTag = (tag) => {
    this.handleTag(tag, 'tag')
  }

  handleTag = (tag, intent) => {
    const { record, datastore } = this.props
    const callback = (msg) => {
      /*
        TODO:
          - Handle what to do if favoriting fails.
      */
    }

    favorite({
      intent,
      datastore,
      record,
      value: tag,
      callback
    })
  }

  handleInputChage = (event, { newValue }) => {
    this.setState({
      tag: newValue
    });
  };

  handleSubmit = (event) => {
    event.preventDefault()
    this.handleCloseModal()

    this.handleAddTag(this.state.tag)
  }

  render() {
    const { record, datastore } = this.props
    /*
      TODO:
        - Check if Record has tags. The Tags will be on the records from Pride.
    */
    //const { tags } = records.favorite_tags
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
            <li key={i}><Tag onRemove={() => this.handleTag(tag, 'untag')}>{tag}</Tag></li>
          ))}
          <li><Button kind="tertiary" small onClick={this.handleOpenModal} className="favorites-add-tag"><Icon name="plus" />Add Tag</Button></li>
        </ul>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal}>
          <form onSubmit={this.handleSubmit}>
            <fieldset className="add-tag-fieldset">
              <label htmlFor="add-tag-input"><span className="add-tag-heading">Add Tag</span>To organize your saved items by keyword, project, or course.</label>
              <FavoriteInputTag
                htmlId="add-input-tag"
                tags={tags}
                onChange={this.handleInputChage}
                name="tag"
                value={this.state.tag}
              />
            </fieldset>
            <Button className="favorites-add-tag-button" type="submit">Add Tag</Button>
            <Button kind="tertiary" onClick={this.handleCloseModal}>Cancel</Button>
          </form>
        </Modal>
      </div>
    )
  }
}

export default FavoriteTags
