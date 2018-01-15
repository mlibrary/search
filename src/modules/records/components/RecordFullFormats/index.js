import React from 'react'

import {
  Icon,
} from '../../../core'
import {
  getRecordFormats,
} from '../../utilities';
import {
  getFormatIconName
} from '../../../pride'

const RecordFullFormats = ({
  fields,
  datastoreUid
}) => {
  const formats = getRecordFormats({
    fields,
    datastoreUid
  })

  return (
    <div className="full-record-header">
      {formats.map((value, index) => {
        const iconName = getFormatIconName({ format: value })

        return (
          <span className="full-record-format" key={index}><Icon name={iconName} />{value}</span>
        )
      })}
    </div>
  )
}

export default RecordFullFormats
