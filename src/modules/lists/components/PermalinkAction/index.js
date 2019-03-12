import React, { Component } from 'react';
import { Modal } from '../../../reusable'
import { colors } from '@umich-lib/styles'
import Heading from '@umich-lib/heading'
import Button from '@umich-lib/button'
import TextInput from '@umich-lib/text-input'
import * as clipboard from 'clipboard-polyfill';

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

  handleCopy = () => {
    var dt = new clipboard.DT();
    dt.setData("text/plain", this.state.permalink);
    clipboard.write(dt);

    this.handleCopied()
  }

  handleCopied = () => {
    this.handleCloseModal()
    this.props.setAlert({
      intent: 'success',
      text: 'Link copied to clipboard!'
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
              <Button
                onClick={this.handleCopy}
              >Copy to clipboard</Button>
              
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