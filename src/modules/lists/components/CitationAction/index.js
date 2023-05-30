import React, { Component } from 'react';
import { Button, Tabs, TabList, Tab, TabPanel } from '../../../reusable';
import { cite } from '../../../citations';
import PropTypes from 'prop-types';

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
    status: undefined
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
        {
          recordUid: record.uid,
          datastoreUid: datastore.uid
        }
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
  }

  handleSubmitCallback = (data) => {
    this.setState({ status: data });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    navigator.clipboard.writeText(document.querySelector('.copy-citation').innerText);
    this.props.setAlert({
      intent: 'success',
      text: 'Citation copied to clipboard!'
    });
    this.props.setActive('');
    this.setState({ status: undefined });
  };

  render () {
    if (this.state.status?.status_code === 'action.response.success') return null;
    return (
      <form onSubmit={this.handleSubmit}>
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
                    <>
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
                        className='y-spacing copy-citation'
                        contentEditable='true'
                        aria-describedby={`${co.id}-disclaimer`}
                        dangerouslySetInnerHTML={{
                          __html: this.state[co.id]
                        }}
                      />
                      <p
                        className='font-small'
                        id={`${co.id}-disclaimer`}
                      >
                        These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work.
                      </p>
                      <Button type='submit' style={{ whiteSpace: 'nowrap' }}>Copy citation</Button>
                    </>
                    )
                  : (
                    <p>Loading ...</p>
                    )}
              </TabPanel>
            );
          })}
        </Tabs>
      </form>
    );
  }
}

CitationAction.propTypes = {
  setActive: PropTypes.func,
  datastore: PropTypes.object,
  record: PropTypes.object,
  viewType: PropTypes.string,
  list: PropTypes.array,
  setAlert: PropTypes.func
};

export default CitationAction;
