import React, { useEffect } from 'react'
import {
  getField,
  getFieldValue
} from '../../utilities';

/*
  Background

  In the library's previous search interfaces,
  the Zotero browser plugin was able to recognize
  search results and identify embedded metadata
  for the result(s) shown on the page. In Library
  Search, the Zotero plugin is not aware of DOM
  changes so does not recognize the change in page state. 


  Solution
  
  Use ContextObjects in Spans
  https://en.wikipedia.org/wiki/COinS

  And tell Zotero COinS was created.
*/
function Zotero({ record }) {
  const z3988 = getFieldValue(getField(record.fields, 'z3988'))[0]

  useEffect(() => {
    // Tell Zotero an Item has been rendered to the page.
    // Only use effect if record has the z3988 to create 
    if (z3988) {
      document.dispatchEvent(new Event('ZoteroItemUpdated', {
        bubbles: true,
        cancelable: true
      }))
    }
  })

  if (!z3988) {
    return null
  }

  // Create COinS
  return (
    <span title={getFieldValue(getField(record.fields, 'z3988'))[0]} className="z3988"></span>
  )
}

export default Zotero