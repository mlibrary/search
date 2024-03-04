import React, { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanel } from '../../../reusable';
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

function CitationAction (props) {
  const stateObject = {
    status: undefined
  };
  citationOptions.forEach((citationOption) => {
    stateObject[citationOption.id] = '';
  });
  const [state, setState] = useState(stateObject);

  useEffect(() => {
    const generateCitations = (records) => {
      citationOptions.forEach((citationOption) => {
        return cite(
          records,
          citationOption.id,
          (chosenStyleID, data) => {
            setState((prevState) => {
              return { ...prevState, [chosenStyleID]: data };
            });
          });
      });
    };
    if (props.viewType === 'Full') {
      const records = [
        {
          recordUid: props.record.uid,
          datastoreUid: props.datastore.uid
        }
      ];
      generateCitations(records);
    }
    if (props.viewType === 'List' && props.list?.length > 0) {
      const records = props.list.map((record) => {
        return {
          recordUid: record.uid,
          datastoreUid: props.datastore.uid
        };
      });
      generateCitations(records);
    }
  }, [props]);

  if (state.status?.status_code === 'action.response.success') return null;
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      navigator.clipboard.writeText(document.querySelector('.copy-citation').innerText);
      props.setAlert({
        intent: 'success',
        text: 'Citation copied to clipboard!'
      });
      props.setActive('');
      setState(stateObject);
    }}
    >
      <Tabs>
        <TabList>
          {citationOptions.map((citationOption) => {
            return (
              <Tab
                key={citationOption.name}
              >{citationOption.name}
              </Tab>
            );
          })}
        </TabList>

        {citationOptions.map((citationOption) => {
          return (
            <TabPanel key={`${citationOption.name}-panel`}>
              {state[citationOption.id]
                ? (
                  <>
                    <label
                      id={`${citationOption.name}-label`}
                      style={{
                        marginTop: '0.5rem'
                      }}
                    >
                      {citationOption.name} citation
                    </label>
                    <div
                      style={{
                        border: 'solid 1px rgba(0, 0, 0, 0.3)',
                        boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.08)',
                        borderRadius: '4px',
                        padding: '0.5rem 0.75rem',
                        overflowY: 'auto',
                        maxHeight: '40vh'
                      }}
                      className='y-spacing copy-citation'
                      contentEditable='true'
                      aria-describedby={`${citationOption.id}-disclaimer`}
                      aria-labelledby={`${citationOption.name}-label`}
                      role='textbox'
                      dangerouslySetInnerHTML={{
                        __html: state[citationOption.id]
                      }}
                    />
                    <p
                      className='font-small'
                      id={`${citationOption.id}-disclaimer`}
                    >
                      These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work.
                    </p>
                    <button
                      className='btn btn--primary'
                      type='submit'
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Copy citation
                    </button>
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

CitationAction.propTypes = {
  setActive: PropTypes.func,
  datastore: PropTypes.object,
  record: PropTypes.object,
  viewType: PropTypes.string,
  list: PropTypes.array,
  setAlert: PropTypes.func
};

export default CitationAction;
