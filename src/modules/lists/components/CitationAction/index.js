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
  MLA: 'modern-language-association',
  APA: 'apa',
  Chicago: 'chicago-note-bibliography',
  IEEE: 'ieee',
  NLM: 'national-library-of-medicine-grant-proposals',
  BibTex: 'bibtex'
};
/* eslint-enable sort-keys */

const citationStyles = Object.keys(citations);

const CitationAction = ({ list = [], record = {}, setActive, setAlert, viewType }) => {
  const [locale, setLocale] = useState(null);
  const [error, setError] = useState(null);
  const [citationStyle, setCitationStyle] = useState(citationStyles[0]);
  const [cslData, setCSLData] = useState(null);
  const [citation, setCitation] = useState(null);

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
    const fetchCitationStyle = async (file) => {
      try {
        const response = await fetch(`/citations/${file}.csl`);
        const data = await response.text();
        setCSLData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCitationStyle(citations[citationStyle]);
  }, [citations, citationStyle]);

  useEffect(() => {
    if (!locale || !cslData) {
      return;
    }
    try {
      const items = viewType === 'Full' ? [cslField(record)] : list.map(cslField);

      const sys = {
        retrieveItem: (id) => {
          return items.find((item) => {
            return item.id === id;
          });
        },
        retrieveLocale: () => {
          return locale;
        }
      };

      const processor = new CSL.Engine(sys, cslData);
      processor.updateItems(items.map((item) => {
        return item.id;
      }));
      const result = processor.makeBibliography();

      setCitation(result[1].join('\n'));
    } catch (err) {
      setError(err.message);
    }
  }, [cslData, list, locale, record, viewType]);

  const handleChange = (event) => {
    setCitationStyle(event.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(document.getElementById(`citation-text-${citationStyle}`).innerText);
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
        {citationStyles.map((style) => {
          return (
            <label key={style}>
              <input
                type='radio'
                value={style}
                checked={citationStyle === style}
                onChange={handleChange}
                className='visually-hidden focus-sibling'
              />
              <div className={`tabs__tab ${citationStyle === style ? 'tabs__tab--active' : ''}`}>
                {style}
              </div>
            </label>
          );
        })}
      </fieldset>
      {citation
        ? (
            <>
              <label
                htmlFor={`${citationStyle}-label`}
                id={`${citationStyle}-label`}
              >
                {citationStyle} citation
              </label>
              <div
                id={`citation-text-${citationStyle}`}
                className='y-spacing'
                contentEditable
                role='textbox'
                dangerouslySetInnerHTML={{ __html: citation }}
                aria-labelledby={`${citationStyle}-label`}
                aria-describedby={`${citationStyle}-disclaimer`}
              />
              <p className='font-small' id={`${citationStyle}-disclaimer`}>
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
              </p>
              <button
                onClick={handleCopy}
                className='btn btn--primary'
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
