import React from 'react'
import ReactGA from 'react-ga';

import Holder from './holder'

/*
  Wrap the Holder so that clicks can be tracked
  for analytics.
*/
export default function HolderContainer({ context, ...rest }) {
  return (
    <div onClick={(e) => handleHolderAnalytics(e, context, rest.caption)}>
      <Holder {...rest} />
    </div>
  )
}

function handleHolderAnalytics(e, context, caption) {
  e.preventDefault(); // only for testing to prevent routing.

  const target = e.target

  /*
    We only want to track anchor tags / links clicked.
    Typically you should aboid using dom APIs (tagName) like
    this with React, but in this case it makes easy to
    implement analytics. Maybe the "preferred" way is to use
    React refs.
  */

  // Track when users click an anchor tag.
  if (target.tagName === 'A') {
    // i.e. "Get this Catalog Medium"
    const label = e.target.innerText + ' from '
      + caption + ' in '
      + context.datastore.name + ' '
      + context.viewType

    ReactGA.event({
      action: 'Click',
      category: 'Resource Access',
      label
    })
  }

  // Track when users click the show all or fewer button.
  if (target.tagName === 'BUTTON' && target.innerText.startsWith('Show')) {
    const fewer = target.innerText.startsWith('Show fewer')
    const label = (fewer ? 'Show fewer ' : 'Show all ')
      + caption + ' items from '
      + context.datastore.name + ' '
      + context.viewType

    ReactGA.event({
      action: 'Click',
      category: 'Resource Access',
      label
    })
  }
}
