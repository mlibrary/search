import React from 'react'
import ResourceAccess from '@umich-lib/resource-access'
import { Link } from 'react-router-dom'

function RenderAnchor({ data }) {
  const s = document.location.search

  if (data.to.action === 'get-this') {
    return (
      <Link to={`/catalog/record/${data.to.record}/get-this/${data.to.barcode}${s}`}>{data.text}</Link>
    )
  }

  return (
    <Link to={`/catalog/record/${data.to.record}${s}`}>{data.text}</Link>
  )
}

class RecordResourceAccess extends React.Component {
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
      return (
        <div className="resource-access-container">
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
      )
    }

    return null
  }
}

export default RecordResourceAccess