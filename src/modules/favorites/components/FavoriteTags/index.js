import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import _ from 'underscore'
import { Button } from '@umich-lib/core'
import ReactGA from 'react-ga'
import { FavoriteInputTag } from '../../../favorites';
import favorite from '../../favorite'
import {
  Tag,
  Modal
} from '../../../reusable'

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
    this.setState({ tag: '' }) // clear the tag input
  }

  handleTag = (tag, intent) => {
    const { record, datastore } = this.props
    const callback = (msg) => {
      /*
        TODO:
          - Handle what to do if favoriting fails.
          - Have a long optimisitic timeout so the record looks favorited until we hear back.
      */
    }

    const ga_add_or_remove = intent === 'tag' ? 'add' : 'remove'
    const ga_record_type = this.props.match.path === '/:datastoreSlug' ? 'medium' : 'full'
    ReactGA.event({
      action: 'Click',
      category: 'Favorites',
      label: `${ga_add_or_remove} tag ${datastore.name} ${ga_record_type} view`
    })

    const data = {
      intent,
      datastore: datastore.uid,
      record,
      value: tag,
      callback
    }

    favorite(data)
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
    const { isFavorited, tags, disabled } = this.props

    if (disabled || !isFavorited) {
      return null
    }

    /*
      TODO:
        - Check if record has suggested tags. This might be on the profile.
    */
    // const { suggestions } = record.favorite_recommended_tags
    // TEMP placeholder to be an example.
    const suggestions = []

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
          <li>
            <Button
              kind="secondary"
              small
              onClick={this.handleOpenModal}
              className="favorites-add-tag"
            >Add Tag</Button></li>
        </ul>

        <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.handleCloseModal}>
          <form onSubmit={this.handleSubmit}>
            <fieldset className="add-tag-fieldset">
              <label htmlFor="add-tag-input"><span className="add-tag-heading">Add Tag</span>To organize your saved items by keyword, project, or course.</label>
              <FavoriteInputTag
                htmlId="add-input-tag"
                suggestions={suggestions}
                onChange={this.handleInputChage}
                name="tag"
                value={this.state.tag}
              />
            </fieldset>
            <Button style={{ marginRight: '1rem' }} type="submit">Add Tag</Button>
            <Button kind="secondary" onClick={this.handleCloseModal}>Cancel</Button>
          </form>
        </Modal>
      </div>
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
  const stateFavoriteTags =
    state.favorites[datastore] &&
    state.favorites[datastore][record.uid] ?
    state.favorites[datastore][record.uid].tags : []
  const stateFavoriteUntags =
    state.favorites[datastore] &&
    state.favorites[datastore][record.uid] ?
    state.favorites[datastore][record.uid].untags : []
  const filteredTags =
    record.favorite_tags ?
    _.difference(record.favorite_tags, stateFavoriteUntags) :
    stateFavoriteTags
  const tags = _.compact(_.uniq([].concat(filteredTags).concat(stateFavoriteTags)))
  return {
    // Is the record favorited (from Spectrum) on the record or
    // is it favorited in state (in current browser session by user)
    isFavorited,
    tags,
    datastore: _.findWhere(state.datastores.datastores, { uid: datastore }),
    disabled: state.favorites.disabled === true
  };
}

export default withRouter(connect(mapStateToProps)(FavoriteTags))