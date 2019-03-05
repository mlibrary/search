import React, { Component } from 'react';
import { Modal } from '../../../reusable'
import { colors } from '@umich-lib/styles'
import Heading from '@umich-lib/heading'
import Button from '@umich-lib/button'
import TextInput from '@umich-lib/text-input'

class CitationAction extends Component {
  state = {
    modalIsOpen: false
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false })

    // Unselects the citation button from the actions lists.
    this.props.setActive(undefined)
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true })
  }

  componentDidMount() {
    this.handleOpenModal();
  }

  handleCopyToClipboard() {
    
  }

  render() {
    return (
      <div style={{
        background: colors.grey[100]
      }}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
          className={this.props.className}
        >
          <Heading
            size="medium"
            level={2}
            style={{ marginTop: '0' }}
          >Copy link</Heading>

          <TextInput
            id="permalink-action"
            hideLabel
            labelText="Permalink"
            type="text"
            style={{
              marginBottom: '0.5rem',
              width: '100%',
              padding: '0.5rem 0.75rem'
            }}
            value={document.location.origin + document.location.pathname}
            onFocus={(e) => e.target.select()}
            readOnly
          />

          <div className="x-spacing" style={{
            marginTop: '0.5rem'
          }}>
            <Button
              onSubmit={this.handleCopyToClipboard}
            >Copy to clipboard</Button>
            <Button
              kind="secondary"
              onClick={this.handleCloseModal}
            >Close</Button>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CitationAction;