import './styles.css';
import React, { useEffect, useState } from 'react';
import { Anchor } from '../../../reusable';
import CSL from 'citeproc';
import { getField } from '../../../records/utilities';

const cslField = (record) => {
  return getField(record.fields, 'csl').value;
};

/* eslint-disable sort-keys */
const citations = {
  MLA: 'modern-language-association.csl',
  APA: 'apa-5th-edition.csl',
  Chicago: 'chicago-note-bibliography-16th-edition.csl',
  IEEE: 'ieee.csl',
  NLM: 'national-library-of-medicine-grant-proposals.csl',
  BibTex: 'bibtex.csl'
};
/* eslint-enable sort-keys */

const CitationAction = ({ list = [], record = {}, setActive, setAlert, viewType }) => {
  const [selectedOption, setSelectedOption] = useState('MLA');
  const [citation, setCitation] = useState(null);
  const [locale, setLocale] = useState(null);
  const [xmlContent, setXmlContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocale = async () => {
      try {
        const response = await fetch('/citations/locales-en-US.xml');
        const data = await response.text();
        setLocale(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchLocale();
  }, []);

  useEffect(() => {
    const fetchXmlContent = async (file) => {
      try {
        const response = await fetch(`/citations/${file}`);
        const data = await response.text();
        setXmlContent(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchXmlContent(citations[selectedOption]);
  }, [citations, selectedOption]);

  useEffect(() => {
    if (!locale || !xmlContent) {
      return;
    }
    try {
      const records = [];

      if (viewType === 'Full') {
        records.push(cslField(record));
      }

      if (viewType === 'List') {
        list.forEach((item) => {
          records.push(cslField(item));
        });
      }

      const sys = {
        retrieveItem: (id) => {
          return records.find((item) => {
            return item.id === id;
          });
        },
        retrieveLocale: () => {
          return locale;
        }
      };

      const processor = new CSL.Engine(sys, xmlContent);
      const recordIds = records.map((item) => {
        return item.id;
      });
      processor.updateItems(recordIds);
      const result = processor.makeBibliography();

      setCitation(result[1].join('\n'));
    } catch (err) {
      setError(err.message);
    }
  }, [list, locale, record, xmlContent]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(document.getElementById(`citation-text-${selectedOption}`).innerText);
    setAlert({
      intent: 'success',
      text: 'Citation copied to clipboard!'
    });
    setActive('');
  };

  if (error) {
    return <p><span className='strong'>Error:</span> {error}</p>;
  }

  return (
    <>
      <fieldset className='tabs margin-bottom__m'>
        {Object.keys(citations).map((option) => {
          return (
            <label key={option}>
              <input
                type='radio'
                value={option}
                checked={selectedOption === option}
                onChange={handleChange}
                className='visually-hidden focus-sibling'
              />
              <div className={`tabs__tab ${selectedOption === option ? 'tabs__tab--active' : ''}`}>
                {option}
              </div>
            </label>
          );
        })}
      </fieldset>
      {citation
        ? (
            <>
              <label
                htmlFor={`${selectedOption}-label`}
                id={`${selectedOption}-label`}
              >
                {selectedOption} citation
              </label>
              <div
                id={`citation-text-${selectedOption}`}
                className='margin-bottom__m y-spacing'
                contentEditable
                role='textbox'
                dangerouslySetInnerHTML={{ __html: citation }}
                aria-labelledby={`${selectedOption}-label`}
                aria-describedby={`${selectedOption}-disclaimer`}
              />
              <small id={`${selectedOption}-disclaimer`}>
                These citations are generated from a variety of data sources. Remember to check citation format and content for accuracy before including them in your work. View the
                {' '}
                <Anchor
                  to='https://lib.umich.edu/research-and-scholarship/help-research/citation-management'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Citation Management guide on U-M Library Website (opens in new tab)
                </Anchor>
                .
              </small>
              <button
                onClick={handleCopy}
                className='btn btn--primary margin-top__m'
              >
                Copy citation
              </button>
            </>
          )
        : (
            <p>Loading citation...</p>
          )}
    </>
  );
};

export default CitationAction;
