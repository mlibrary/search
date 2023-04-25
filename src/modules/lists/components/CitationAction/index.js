import React, { Component } from 'react';
import { SEARCH_COLORS } from '../../../reusable/umich-lib-core-temp';
import { Modal, Button, Tabs, TabList, Tab, TabPanel } from '../../../reusable';
import { cite } from '../../../citations';
import PropTypes from 'prop-types';

class CitationArea extends Component {
  render () {
    return (
      <div
        style={{
          border: 'solid 1px rgba(0, 0, 0, 0.3)',
          boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.08)',
          borderRadius: '4px',
          padding: '0.5rem 0.75rem',
          marginTop: '1rem',
          overflowY: 'scroll',
          maxHeight: '40vh'
        }}
        className='y-spacing'
        contentEditable='true'
        {...this.props}
      />
    );
  }
}

const citationOptions = [
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
];

class CitationAction extends Component {
  state = {
    modalIsOpen: false
  };

  handleCloseModal = () => {
    this.setState({ modalIsOpen: false });
    // Unselects the citation button from the actions lists.
    this.props.setActive(undefined);
  };

  handleOpenModal = () => {
    this.setState({ modalIsOpen: true });
  };

  handleCitationsData = (chosenStyleID, data) => {
    this.setState({
      ...this.state,
      [chosenStyleID]: data
    });
  };

  generateCitations = (records) => {
    citationOptions.forEach((co) => {
      return cite(records, co.id, this.handleCitationsData);
    });
  };

  componentDidMount () {
    const {
      datastore,
      record,
      viewType,
      list
    } = this.props;

    if (viewType === 'Full') {
      const records = [
        { recordUid: record.uid, datastoreUid: datastore.uid }
      ];
      this.generateCitations(records);
    } else if (viewType === 'List' && list && list.length > 0) {
      const records = list.map((r) => {
        return {
          recordUid: r.uid,
          datastoreUid: datastore.uid
        };
      });
      this.generateCitations(records);
    }

    this.handleOpenModal();
  }

  handleCopyToClipboard = () => {
    navigator.clipboard.writeText(document.querySelector('.csl-entry').innerText);

    this.handleCloseModal();

    this.props.setAlert({
      intent: 'success',
      text: 'Citation copied to clipboard!'
    });
  };

  render () {
    return (
      <div style={{
        background: SEARCH_COLORS.grey[100]
      }}
      >
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.handleCloseModal}
          className={this.props.className}
        >
          <h2
            className='heading-medium'
            style={{ marginTop: '0' }}
          >Select a citation format
          </h2>

          <Tabs>
            <TabList>
              {citationOptions.map((co) => {
                return (
                  <Tab
                    key={co.name}
                  >{co.name}
                  </Tab>
                );
              })}
            </TabList>

            {citationOptions.map((co) => {
              return (
                <TabPanel key={`${co.name}-panel`}>
                  {this.state[co.id]
                    ? (
                      <div className='y-spacing'>
                        <CitationArea
                          aria-describedby={`${co.id}-disclaimer`}
                          dangerouslySetInnerHTML={{
                            __html: this.state[co.id]
                          }}
                        />
                        <p
                          className='font-small'
                          id={`${co.id}-disclaimer`}
                        >These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work.
                        </p>
                        <Button
                          onClick={() => {
                            return this.handleCopyToClipboard();
                          }}
                          style={{ marginRight: '1rem' }}
                        >Copy citation
                        </Button>
                        <Button kind='secondary' onClick={this.handleCloseModal}>Close</Button>
                      </div>
                      )
                    : (
                      <p>Loading ...</p>
                      )}
                </TabPanel>
              );
            })}
          </Tabs>
        </Modal>
      </div>
    );
  }
}

CitationAction.propTypes = {
  setActive: PropTypes.func,
  datastore: PropTypes.object,
  record: PropTypes.object,
  viewType: PropTypes.string,
  list: PropTypes.array,
  setAlert: PropTypes.func,
  className: PropTypes.string
};

export default CitationAction;
