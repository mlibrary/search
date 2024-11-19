import { getField, getFieldValue } from '../../utilities';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/*
 * Background
 *
 * In the library's previous search interfaces,
 * the Zotero browser plugin was able to recognize
 * search results and identify embedded metadata
 * for the result(s) shown on the page. In Library
 * Search, the Zotero plugin is not aware of DOM
 * changes so does not recognize the change in page state.
 *
 * Solution
 *
 * Use ContextObjects in Spans
 * - https://en.wikipedia.org/wiki/COinS
 * - https://web.archive.org/web/20170424223448/http://ocoins.info/
 *
 * And tell Zotero COinS was created.
 */
const Zotero = ({ fields = [] }) => {
  const [z3988, setZ3988] = useState(null);
  const [value] = getFieldValue(getField(fields, 'z3988'));

  useEffect(() => {
    setZ3988(value);
  }, [value]);

  useEffect(() => {
    document.dispatchEvent(new Event('ZoteroItemUpdated', {
      bubbles: true,
      cancelable: true
    }));
  }, [z3988]);

  if (!z3988) {
    return null;
  }

  // Create COinS
  return (
    <span title={z3988} className='Z3988' tabIndex='-1' />
  );
};

Zotero.propTypes = {
  fields: PropTypes.array
};

export default Zotero;
