/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Component } from 'react';
import { Modal } from '../../../reusable'
import { Button } from '@umich-lib/core'
import { SEARCH_COLORS } from '../../../reusable/umich-lib-core-temp'

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
    navigator.clipboard.writeText(this.state.permalink)
    this.handleCopied()
  }

  handleCopied = () => {
    this.handleCloseModal()
    this.props.setAlert({
      intent: 'success',
      text: 'Link copied!'
    })
  }

  render() {
    return (
      <div style={{
        background: SEARCH_COLORS.grey[100]
      }}>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
          className={this.props.className}
        >
          <h2
            className="heading-medium"
            style={{ marginTop: '0' }}
          >Copy link</h2>

          <div
            css={{
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <label
              htmlFor="permalink-action"
              className="offscreen"
            >
              Permalink
            </label>
            <input
              type="text"
              id="permalink-action"
              value={this.state.permalink}
              onFocus={(e) => e.target.select()}
              readOnly
              css={{
                marginBottom: '0.5rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                color: '#333',
                cursor: 'pointer'
              }}
            />
          </div>

          <div className="y-spacing">
            <div className="x-spacing" style={{
                marginTop: '0.5rem'
              }}>
              <Button
                onClick={this.handleCopy}
              >Copy link</Button>
              
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