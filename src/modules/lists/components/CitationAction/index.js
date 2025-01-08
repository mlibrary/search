import './styles.css';
import { Anchor, Tab, TabPanel, Tabs } from '../../../reusable';
import React, { useEffect, useState } from 'react';
import { cite } from '../../../citations';
import { useSelector } from 'react-redux';

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

const CitationAction = ({ datastoreUid, record, setActive, setAlert, viewType }) => {
  const { [datastoreUid]: list = [] } = useSelector((state) => {
    return state.lists || {};
  });
  const [citations, setCitations] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCitations = () => {
      setLoading(true);

      let records = [];

      if (viewType === 'Full') {
        records = [{ datastoreUid, recordUid: record.uid }];
      }
      if (viewType === 'List' && list.length > 0) {
        records = list.map((item) => {
          return { datastoreUid, recordUid: item.uid };
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
  }, [viewType, record, datastoreUid, list]);

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
        const { id, name } = citationOption;
        const citation = citations[id];
        return (
          <TabPanel key={`${name}-panel`}>
            {citation
              ? (
                  <>
                    <label
                      htmlFor={`${name}-label`}
                      className='margin-top__s'
                      id={`${name}-label`}
                    >
                      {name} citation
                    </label>
                    <div
                      id={`citation-text-${id}`}
                      className='y-spacing copy-citation padding-y__xs padding-x__s container__rounded'
                      contentEditable
                      aria-describedby={`${id}-disclaimer`}
                      aria-labelledby={`${name}-label`}
                      role='textbox'
                      dangerouslySetInnerHTML={{ __html: citation }}
                    />
                    <p
                      className='font-small citation-disclaimer'
                      id={`${id}-disclaimer`}
                    >
                      These citations are generated from a variety of data sources.
                      Remember to check citation format and content for accuracy before including them in your work.
                      View the
                      {' '}
                      <Anchor
                        to='https://lib.umich.edu/research-and-scholarship/help-research/citation-management'
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        Citation Management guide on U-M Library Website (opens in new tab)
                      </Anchor>
                      .
                    </p>
                    <button
                      onClick={() => {
                        return handleCopy(id);
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

export default CitationAction;
