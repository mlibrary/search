import React, { Component } from 'react';
import { Modal } from '../../../reusable'
import { colors } from '@umich-lib/styles'
import Heading from '@umich-lib/heading'
import Button from '@umich-lib/button'
import TextInput from '@umich-lib/text-input'
import { CopyToClipboard } from 'react-copy-to-clipboard';

class CitationAction extends Component {
  state = {
    modalIsOpen: false,
    copied: false,
    permalink: ''
  }

  handleCloseModal = () => {
    this.setState({modalIsOpen: false })

    // Unselects the citation button from the actions lists.
    this.props.setActive(undefined)
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true })
  }

  componentDidMount() {
    this.handleOpenModal();

    this.setState({
      permalink: document.location.origin + document.location.pathname
    })
  }

  handleCopied = () => {
    this.handleCloseModal()
    this.props.setAlert({
      intent: 'success',
      text: 'Link successfuly copied to clipboard!'
    })
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
              padding: '0.5rem 0.75rem',
              color: '#333',
              cursor: 'pointer'
            }}
            value={this.state.permalink}
            onFocus={(e) => e.target.select()}
            readOnly
          />

          <div className="y-spacing">
            <div className="x-spacing" style={{
                marginTop: '0.5rem'
              }}>
              <CopyToClipboard
                text={this.state.permalink}
                onCopy={this.handleCopied}
              >
                <Button
                  onSubmit={this.handleCloseModal}
                >Copy to clipboard</Button>
              </CopyToClipboard>
              
              <Button
                kind="secondary"
                onClick={this.handleCloseModal}
              >Close</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default CitationAction;