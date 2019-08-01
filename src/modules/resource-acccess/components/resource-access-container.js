import React, { useEffect, useState } from 'react'
import { _ } from 'underscore'

import ResourceAccessLoading from './resource-access-loading'
import Holders from './holders'
import { set } from 'react-ga';

function ResourceAccessContainer({ record }) {
  /*
    Website datastore does not use ResourceAccess
  */
  if (record.datastore === 'website') {
    return null
  }

  /*
    Does the record indicate if holdings are being loaded?
    This only matters with mirlyn aka catalog.
  */
  if (
    record.loadingHoldings
    || (record.datastore === 'mirlyn' && record.resourceAccess.length === 0)
  ) {
    return <ResourceAccessLoading />
  }

  /*
    If you've made it this far, then ready to render.
  */
  return <ResourceAccess record={record} />
}

function ResourceAccess({ record }) {
  const [expandedIds, setExpandedIds] = useState(() => preExpandedIds(record))

  useEffect(() => {
    console.log('ResourceAccess useEffect', expandedIds)
  }, [expandedIds])

  /*
    The Accordion will pass ids of the expanded
    accordion items.
  */
  function handleChange(ids) {
    /*
      TODO:
        - [ ] Figure out what Accordion has expanded or collapsed
    */

    setExpandedIds(ids)
  }

  return (
    <Holders
      record={record}
      preExpandedIds={preExpandedIds(record)}
      handleChange={handleChange}
      createId={createId}
    />
  )
}

/*
  Create a list of uuids that should be Accordion preExpanded'ed
  Docs: https://www.npmjs.com/package/react-accessible-accordion#preexpanded-string--optional--default--
*/
function preExpandedIds(record) {
  return record.resourceAccess.reduce((acc, item, index) => {
    if (item.preExpanded) {
      acc = acc.concat(createId(record, index))
    }

    return acc
  }, [])
}


function createId(record, i) {
  return 'holder--' + record.datastore + record.uid + '-' + i
}


export default ResourceAccessContainer