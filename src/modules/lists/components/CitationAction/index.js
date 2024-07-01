import React, { useEffect, useState } from 'react';
import { Tab, TabPanel, Tabs } from '../../../reusable';
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

const CitationAction = ({ datastore, list, record, setActive, setAlert, viewType }) => {
  const [citations, setCitations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitations = () => {
      setLoading(true);

      let records = [];

      if (viewType === 'Full') {
        records = [{ datastoreUid: datastore.uid, recordUid: record.uid }];
      }
      if (viewType === 'List' && list.length > 0) {
        records = list.map((item) => {
          return { datastoreUid: datastore.uid, recordUid: item.uid };
        });
      }

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
  }, [viewType, record, datastore, list]);

  const handleCopy = (citationId) => {
    navigator.clipboard.writeText(document.getElementById(`citation-text-${citationId}`).innerText);
    setAlert({
      intent: 'success',
      text: 'Citation copied to clipboard!'
    });
    setActive('');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Tabs>
      {citationOptions.map((citationOption) => {
        return (
          <Tab key={citationOption.name}>{citationOption.name}</Tab>
        );
      })}

      {citationOptions.map((citationOption) => {
        const citation = citations[citationOption.id];
        return (
          <TabPanel key={`${citationOption.name}-panel`}>
            {citation
              ? (
                  <>
                    <label
                      htmlFor={`${citationOption.name}-label`}
                      className='margin-top__s'
                      id={`${citationOption.name}-label`}
                    >
                      {citationOption.name} citation
                    </label>
                    <div
                      id={`citation-text-${citationOption.id}`}
                      style={{
                        border: 'solid 1px var(--search-color-grey-400)',
                        boxShadow: 'none',
                        maxHeight: '40vh',
                        overflowY: 'auto'
                      }}
                      className='y-spacing copy-citation padding-y__xs padding-x__s container__rounded'
                      contentEditable
                      aria-describedby={`${citationOption.id}-disclaimer`}
                      aria-labelledby={`${citationOption.name}-label`}
                      role='textbox'
                      dangerouslySetInnerHTML={{ __html: citation }}
                    />
                    <p
                      className='font-small citation-disclaimer'
                      id={`${citationOption.id}-disclaimer`}
                    >
                      These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work.
                    </p>
                    <button
                      onClick={() => {
                        return handleCopy(citationOption.id);
                      }}
                      className='btn btn--primary'
                    >
                      Copy citation
                    </button>
                  </>
                )
              : (
                  <p>Loading citation...</p>
                )}
          </TabPanel>
        );
      })}
    </Tabs>
  );
};

CitationAction.propTypes = {
  datastore: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }).isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string.isRequired
  })),
  record: PropTypes.shape({
    uid: PropTypes.string.isRequired
  }),
  setActive: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  viewType: PropTypes.oneOf(['Full', 'List']).isRequired
};

export default CitationAction;
