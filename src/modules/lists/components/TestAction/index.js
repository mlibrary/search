// Import { Anchor, Tab, TabPanel, Tabs } from '../../../reusable';
import { citations, locale } from '../../utilities';
import React, { useEffect, useState } from 'react';
// Import { citations, cite, locale } from '../../utilities';
import CSL from 'citeproc';
import { getField } from '../../../records/utilities';

// { datastoreUid, list = [], record = {}, setActive, setAlert, viewType }

const TestAction = ({ record = {} }) => {
  const [bibliography, setBibliography] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Example citation data
      const citationData = [{
        author: [{ family: 'Doe', given: 'John' }],
        id: 'ITEM-1',
        issued: { 'date-parts': [[2020]] },
        title: 'Example Book',
        type: 'book'
      }];

      const test = getField(record.fields, 'csl').value;
      citationData.push(test);

      // Citeproc system object
      const sys = {
        retrieveItem: (id) => {
          return citationData.find((item) => {
            return item.id === id;
          });
        },
        retrieveLocale: () => {
          return locale;
        }
      };

      // Initialize citeproc
      const processor = new CSL.Engine(sys, citations.MLA);
      processor.updateItems(['ITEM-1', test.id]);
      const result = processor.makeBibliography();

      setBibliography(result[1].join('\n'));
    } catch (err) {
      setError(err.message);
    }
  }, []);

  if (error) {
    return <p><span className='strong'>Error:</span> {error}</p>;
  }

  return (bibliography ? <div className='copy-citation' dangerouslySetInnerHTML={{ __html: bibliography }} /> : <p>Loading citation...</p>);
};

export default TestAction;
