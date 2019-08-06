import React, { useState } from 'react'

import ResourceAccessLoading from './resource-access-loading'
import Holders from './holders'
import { ContextProvider } from '../../reusable'
import ReactGA from 'react-ga';

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

/*
  Basically a container to handle the logic for
  sending a Google Analytics event related to
  expanding accordion items.
*/
function ResourceAccess({ record, context }) {
  const [expandedIds, setExpandedIds] = useState(() => preExpandedIds(record))

  function handleChange(ids) {
    // Difference between the two arrays
    const id = expandedIds
      .filter(x => !ids.includes(x))
      .concat(ids.filter(x => !expandedIds.includes(x)))[0]

    console.log('id', id)

    // Was the id expanded or collapsed
    const expanded = !expandedIds.includes(id)
    const resourceAccessIndex = id[id.length - 1]
    const resourceAccessData = record.resourceAccess[resourceAccessIndex]
    const caption = resourceAccessData.caption ? resourceAccessData.caption : 'Availability'
    const label = (expanded ? 'Expand ' : 'Collapse ')
      + caption + ' from '
      + context.datastore.name + ' ' + context.viewType

    const event = {
      action: 'Click',
      category: 'Resource Access',
      label
    }

    if (process.env.NODE_ENV === 'production') {
      ReactGA.event(event)
    } else {
      console.log('[development] Google Analytics Event', event)
    }

    setExpandedIds(ids)
  }

  return (
    <Holders
      record={record}
      preExpandedIds={preExpandedIds(record)}
      handleChange={handleChange}
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