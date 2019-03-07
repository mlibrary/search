import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '@umich-lib/tabs'
import { Modal } from '../../../reusable'
import { colors } from '@umich-lib/styles'
import Heading from '@umich-lib/heading'
import Button from '@umich-lib/button'
import { cite } from '../../../citations'

class CitationText extends React.Component {
  render() {
    return (
      <textarea
        style={{
          marginTop: '0.5rem',
          marginBottom: '0',
          width: '100%',
          padding: '0.5rem 0.75rem'
        }}
        value={this.props.value}
        onFocus={(e) => e.target.select()}
        readOnly
      />
    )
  }
}

const citation_options = [
  {
    id: 'apa-5th-edition',
    name: 'MLA'
  },
  {
    name: 'APA'
  },
  {
    name: 'Chicago'
  },
  {
    name: 'IEEE'
  },
  {
    name: 'NLM'
  },
  {
    name: 'BibTex'
  }
]

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
    const {
      datastore,
      record,
      recordViewType
    } = this.props

    // If a record is passed in as a prop, then that means it's a full record page.
    // If not, then it's a list view.
    // TOOD: - Maybe get this information from the ContextProvider component.
    if (recordViewType === 'Full') {
      const recordsToCite = [
        { recordUid: record.uid, datastoreUid: datastore.uid }
      ]
  
      let citations = cite(recordsToCite, 'apa-5th-edition')

      /*
        TODO

        - [ ] Add these citations to component state.
      */

    } else {
      // List view

      // TODO
    }

    //console.log('citations', citations)

    this.handleOpenModal();
  }

  render() {
    const value="Citation not available yet. This text is a placeholder."

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
          >Select a citation format</Heading>

          <Tabs>
            <TabList>
              {citation_options.map(co => (
                <Tab key={co.name}>{co.name}</Tab>
              ))}
            </TabList>

            <TabPanel>
              <CitationText value={value} />
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
            <TabPanel>
              <CitationText value={value}/>
            </TabPanel>
          </Tabs>

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
