import React, { useEffect, useState } from 'react'
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
  const [ z3988, setZ3988 ] = useState(null)

  useEffect(() => {
    setZ3988(getFieldValue(getField(record.fields, 'z3988'))[0])
  })

  useEffect(() => {
    try {
      document.dispatchEvent(new Event('ZoteroItemUpdated', {
        bubbles: true,
        cancelable: true
      }))
    }
    catch(error) {
      console.error(error)
    }
  }, [z3988]) // Only change when z3988 changes.

  if (!z3988) {
    return null
  }

  // Create COinS
  return (
    <span title={z3988} className="Z3988" />
  )
}

export default Zotero