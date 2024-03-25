import React, { useState, useEffect } from 'react';
import { Tabs, Tab, TabPanel } from '../../../reusable';
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

  const handleCopy = (citationId) => {
    navigator.clipboard.writeText(document.getElementById(`citation-text-${citationId}`).innerText);
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
      {citationOptions.map((citationOption) => {
        return (
          <Tab key={citationOption.name}>{citationOption.name}</Tab>
        );
      })}

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
                      overflowY: 'auto',
                      maxHeight: '40vh'
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
