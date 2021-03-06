import React, { Component } from 'react';
import {
  COLORS,
  Heading,
  Tabs,
  TabList,
  Tab,
  Text,
  TabPanel,
  Button
} from '@umich-lib/core'
import * as clipboard from 'clipboard-polyfill';
import { Modal } from '../../../reusable'
import { cite } from '../../../citations'
import ReactGA from 'react-ga'

class CitationArea extends React.Component {
  render() {
    return (
      <div
        style={{
          border: `solid 1px rgba(0, 0, 0, 0.3)`,
          boxShadow: `inset 0 1px 4px rgba(0, 0, 0, 0.08)`,
          borderRadius: `4px`,
          padding: `0.5rem 0.75rem`,
          marginTop: '1rem',
          overflowY: 'scroll',
          maxHeight: '40vh'
        }}
        className="y-spacing"
        contenteditable="true"
        {...this.props}
      />
    )
  }
}

const citation_options = [
  {
    id: 'modern-language-association',
    name: 'MLA'
  },
  {
    id: 'apa-5th-edition',
    name: 'APA'
  },
  {
    id: 'chicago-note-bibliography-16th-edition',
    name: 'Chicago'
  },
  {
    id: 'ieee',
    name: 'IEEE'
  },
  {
    id: 'national-library-of-medicine-grant-proposals',
    name: 'NLM'
  },
  {
    id: 'bibtex',
    name: 'BibTex'
  }
]

class CitationAction extends Component {
  state = {
    modalIsOpen: false
  }

  handleTabClick = (label) => {
    ReactGA.event({
      action: 'Tab',
      category: 'Cite This',
      label: `${label} ${this.props.viewType}`
    })
  }

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false })
    // Unselects the citation button from the actions lists.
    this.props.setActive(undefined)
    ReactGA.event({
      action: 'Click',
      category: 'Cite This',
      label: `Close`
    })
  }

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true })
  }

  handleCopyToClipboard = (id) => {
    const citation = this.state[id]

    var dt = new clipboard.DT();
    dt.setData("text/plain", citation);
    clipboard.write(dt);

    this.props.setAlert({
      intent: 'success',
      text: 'Citation copied to clipboard!'
    })
    
    this.handleCloseModal()
  }

  handleCitationsData = (chosenStyleID, data) => {
    this.setState({
      ...this.state,
      [chosenStyleID]: data
    })
  }

  generateCitations = (records) => {
    citation_options.forEach(co => cite(records, co.id, this.handleCitationsData))
  }

  componentDidMount() {
    const {
      datastore,
      record,
      viewType,
      list
    } = this.props

    if (viewType === 'Full') {
      const records = [
        { recordUid: record.uid, datastoreUid: datastore.uid }
      ]
      this.generateCitations(records)
    } else if (viewType === 'List' && list && list.length > 0) {
      const records = list.map(r => ({
        recordUid: r.uid,
        datastoreUid: datastore.uid
      }))
      this.generateCitations(records)
    }

    this.handleOpenModal();
  }

  render() {
    return (
      <div style={{
        background: COLORS.grey[100]
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
          >Select a citation format</Heading>

          <Tabs>
            <TabList>
              {citation_options.map(co => (
                <Tab
                  key={co.name}
                  onClick={() => this.handleTabClick(co.name)}
                >{co.name}</Tab>
              ))}
            </TabList>

            {citation_options.map(co => (
              <TabPanel>
                {this.state[co.id] ? (
                  <div className="y-spacing">
                    <CitationArea
                      aria-describedby={`${co.id}-disclaimer`}
                      dangerouslySetInnerHTML={{
                        __html: this.state[co.id]
                      }}
                    />

                    <Text
                      small
                      id={`${co.id}-disclaimer`}
                    >These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work.</Text>
                    <Button kind="secondary" onClick={this.handleCloseModal}>Close</Button>
                  </div>
                ) : (
                  <p>Loading ...</p>
                )}
              </TabPanel>
            ))}
          </Tabs>
        </Modal>
      </div>
    )
  }
}

export default CitationAction;
