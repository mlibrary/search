import React from 'react'
import ResourceAccess from '@umich-lib-ui/resource-access'
import { Link } from 'react-router-dom'

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
                <Link to={data.to}>{data.text}</Link>
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