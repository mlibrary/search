import React from 'react'
import ResourceAccess from '@umich-lib-ui/resource-access'
import { Link } from 'react-router-dom'

function RenderAnchor({ record, data }) {
  const s = document.location.search

  if (data.to.indexOf('get-this') === 1) {
    return (
      <Link to={`/catalog/record/${record.uid}${data.to}${s}`}>{data.text}</Link>
    )
  }

  return (
    <Link to={`/catalog${data.to}${s}`}>{data.text}</Link>
  )
}

class RecordResourceAccess extends React.Component {
  render() {
    const {
      record
    } = this.props
    const ra = record.resourceAccess

    if (record.loadingHoldings) {
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
        <div className="resource-access-container y-spacing">
          {ra.map(r => (
            <ResourceAccess
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