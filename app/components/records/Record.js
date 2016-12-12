import React from 'react'
import { connect } from 'react-redux'
import { getField, getFieldValue } from './../../utilities/getField.js'

class Record extends React.Component {
  render() {
    const data = this.props.record.data
    const name = data.names[0]
    const fields = data.fields.map((field, index) =>
      <p key={index} className="u-break-word">{field.name}: {field.value}</p>
    )

    const publish_date = getFieldValue(getField(data.fields, 'publish_date'))
    const format = getFieldValue(getField(data.fields, 'format'))
    const author = getFieldValue(getField(data.fields, 'author'))
    const brief_description = getFieldValue(getField(data.fields, 'brief_description'))

    return (
      <li className="record">
        <p className="record-title u-margin-top-none">
          <a href="">{name}</a> {publish_date}
        </p>
        <p>
          { brief_description }
        </p>
        <p>
          {format} {author}
        </p>
      </li>
    )
  }
}

Record.propTypes = {
  record: React.PropTypes.object.isRequired
}

export default Record
