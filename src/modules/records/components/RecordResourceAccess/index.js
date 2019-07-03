/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import React from 'react'
import {
  ResourceAccess,
  SPACING
} from '@umich-lib/core'
import { Link } from 'react-router-dom'
import { ContextProvider } from '../../../reusable'
import ReactGA from 'react-ga'

function RenderAnchor({ data }) {
  /*
    Rendered Anchors go to
    - an internal Get This page, or
    - a full record page.
  */
  let to

  if (data.to.action === 'get-this') {
    to = `/catalog/record/${data.to.record}/get-this/${data.to.barcode}`
      + `${document.location.search}`
  } else {
    to = `/catalog/record/${data.to.record}`
      + `${document.location.search}`
  }

  return (
    <Link
      to={to}
    >
      {data.text}
    </Link>
  )
}

class RecordResourceAccess extends React.Component {
  handleAnalytics = (e, data) => {
    const target = e.target
    /*
      We only want to track anchor tags / links clicked.

      Typically you should aboid using dom APIs (tagName) like
      this with React, but in this case it makes easy to
      implement analytics. Maybe the "preferred" way is to use
      React refs.
    */
    if (target.tagName === 'A') {
      // i.e. "Get this Catalog Medium"
      const label = `${e.target.innerText} ${data.datastore.name} ${data.viewType}`

      ReactGA.event({
        action: 'Click',
        category: 'Resource Access',
        label
      })
    }
  }

  render() {
    const {
      record,
      datastoreUid
    } = this.props
    const ra = record.resourceAccess

    if (record.loadingHoldings || (datastoreUid === 'mirlyn' && ra.length === 0)) {
      return (
        <div className="resource-access-container">
          <div className="access-placeholder-container">
            <div className="placeholder placeholder-access placeholder-inline"></div>
            <div className="placeholder placeholder-inline"></div>
          </div>
        </div>
      )
    }

    if (ra) {
      /*
        ContextProvider adds in the active datastore
        and the record view type (medium or full).

        Use onClick on parent element to avoid modifying
        the ResourceAcess component to be concerned about
        where it is used.
      */

      return (
        <ContextProvider
          render={data => (
            <div
              onClick={(e) => this.handleAnalytics(e, data)}
              key={`datastoreUid-${record.uid}`}
              className="resource-access-container"
            >
              {ra.map((r, i) => (
                <ResourceAccess
                  key={i}
                  renderAnchor={(data) => (
                    <RenderAnchor
                      data={data}
                      record={record}
                    />
                  )}
                  {...r}
                />
              ))}
            </div>
          )}
        />
      )
    }
  }
}

export default RecordResourceAccess