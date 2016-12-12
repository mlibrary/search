import React from 'react'
import { connect } from 'react-redux'

class Record extends React.Component {
  render() {
    const partial = this.props.record.partial
    const name = partial.names[0]
    const fields = partial.fields.map((field, index) =>
      <p key={index} className="u-break-word">{field.name}: {field.value}</p>
    )

    return (
      <li className="record">
        <div className="row">
          <div className="col-lg-7 col-md-12">
            <a href="" className="record-title underline">{name}</a>
            { fields }
          </div>
        </div>
      </li>
    )
  }
}

Record.propTypes = {
  record: React.PropTypes.object.isRequired
}

export default Record
