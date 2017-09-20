import React from 'react'

import { Icon } from '../../../core'

const HoldingStatus = ({ status }) => {
  if (status) {
    switch (status.trim()) {
      case 'On shelf':
        return (
          <span className="holding-text holding-status-on-shelf">
            <Icon name="checkbox-marked-circle" /> {status}
          </span>
        )
      case 'Missing':
        return (
          <span className="holding-text holding-status-missing">
            <Icon name="alert" /> {status}
          </span>
        )
      default:
        // do nothing
    }
  }

  if (status.indexOf('Checked out:') !== -1) { // Is checked out
    return (
      <span className="holding-text holding-status-checked-out">
        <Icon name="timetable" />{status}
      </span>
    )
  }

  return <span className="holding-text">{status}</span>
}

export default HoldingStatus;
