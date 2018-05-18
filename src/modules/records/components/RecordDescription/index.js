import React from 'react'
import { _ } from 'underscore';
import {
  getField,
  getFieldValue
} from '../../utilities';
import config from '../../../../config'


function createMarkup(markup_string) {
  return {__html: markup_string};
}

const RecordDescription = ({ record }) => {
  const fieldConfig = _.findWhere(config.fields, {datastore: record.datastore})
  if (!fieldConfig.full.description) {
    return null
  }

  const description = getFieldValue(getField(record.fields, fieldConfig.full.description))[0]

  return (
    <p className="full-record__description" dangerouslySetInnerHTML={createMarkup(description)} />
  )
}

export default RecordDescription
