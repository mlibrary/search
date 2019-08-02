import React from 'react'
import ReactGA from 'react-ga';

import Holder from './holder'

export default function HolderContainer({ context, ...rest }) {
  return (
    <div onClick={(e) => handleHolderLinkAnalytics(e, context, rest.caption)}>
      <Holder {...rest} />
    </div>
  )
}

function handleHolderLinkAnalytics(e, context, caption) {
  const target = e.target
  e.preventDefault();
  /*
    We only want to track anchor tags / links clicked.
    Typically you should aboid using dom APIs (tagName) like
    this with React, but in this case it makes easy to
    implement analytics. Maybe the "preferred" way is to use
    React refs.
  */
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
}
