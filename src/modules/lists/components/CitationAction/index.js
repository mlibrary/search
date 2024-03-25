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
  const [citations, setCitations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitations = async () => {
      setLoading(true);

      const records = props.viewType === 'Full'
        ? [
            { recordUid: props.record.uid, datastoreUid: props.datastore.uid }
          ]
        : props.viewType === 'List' && props.list.length
          ? props.list.map((record) => {
            return {
              recordUid: record.uid, datastoreUid: props.datastore.uid
            };
          })
          : [];

      if (records.length === 0) {
        setLoading(false);
        return;
      }

      for (const option of citationOptions) {
        cite(
          records,
          option.id,
          (chosenStyleID, data) => {
            setCitations((prevCitations) => {
              return { ...prevCitations, [chosenStyleID]: data };
            });
          }
        );
      }
      setLoading(false);
    };
    fetchCitations();
  }, [props.viewType, props.record, props.datastore, props.list]);

  const handleCopy = () => {
    navigator.clipboard.writeText(document.querySelector('.copy-citation').innerText);
    props.setAlert({
      intent: 'success',
      text: 'Citation copied to clipboard!'
    });
    props.setActive('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Tabs>
      <TabList>
        {citationOptions.map((citationOption) => {
          return (
            <Tab key={citationOption.name}>{citationOption.name}</Tab>
          );
        })}
      </TabList>

      {citationOptions.map((citationOption) => {
        const citation = citations[citationOption.id];
        return (
          <TabPanel key={`${citationOption.name}-panel`}>
            {!citation
              ? (
                <p>Loading citation...</p>
                )
              : (
                <>
                  <label htmlFor={`${citationOption.name}-label`} className='margin-top__s'>
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
                    contentEditable
                    aria-describedby={`${citationOption.id}-disclaimer`}
                    aria-labelledby={`${citationOption.name}-label`}
                    role='textbox'
                    dangerouslySetInnerHTML={{ __html: citation }}
                  />
                  <p className='font-small citation-disclaimer'>
                    These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work.
                  </p>
                  <button
                    onClick={handleCopy}
                    className='btn btn--primary'
                  >
                    Copy citation
                  </button>
                </>
                )}
          </TabPanel>
        );
      })}
    </Tabs>
  );
}

CitationAction.propTypes = {
  setActive: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf(['Full', 'List']).isRequired,
  datastore: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired,
  record: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }),
  list: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired
  }))
};

export default CitationAction;
