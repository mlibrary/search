import React from 'react'

import ResourceAccessLoading from './resource-access-loading'
import Holders from './holders'
import { ContextProvider } from '../../reusable'

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

    ContextProvider is required to send Context
    to ResourceAccess create a label for GA event.
  */
  return (
    <ContextProvider render={context => (
      <ResourceAccess record={record} context={context} />
    )} />
  )
}

function ResourceAccess({ record, context }) {
  return (
    <Holders
      record={record}
      preExpandedIds={preExpandedIds(record)}
      createId={createId}
      context={context}
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

/*
  These need to be unique to the app for React to handle
  rendering properly.
*/
function createId(record, i) {
  return 'holder--' + record.datastore + record.uid + '-' + i
}

export default ResourceAccessContainer