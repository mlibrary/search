import React from 'react'

import { Icon } from '../../../core'

const HoldingStatus = ({ status }) => {
  if (status) {
    switch (status.trim()) {
      case 'On shelf':
        return (
          <span className="holding-detail holding-detail-on-shelf">
            <Icon name="check" /> {status}
          </span>
        )
      case 'Missing':
        return (
          <span className="holding-detail holding-detail-missing">
            <Icon name="alert" /> {status}
          </span>
        )
      default:
        // do nothing
    }

    const checkedOutindex = status.indexOf('Checked out:')

    if (checkedOutindex !== -1) {
      return (
        <span>
          <span className="holding-detail holding-detail-checked-out">
            <Icon name="timetable" />{status.substr(0, 11)}
          </span>
          {status.substr(12)}
        </span>
      )
    }
  }

  return <span className="holding-detail">{status}</span>
}

export default HoldingStatus;
