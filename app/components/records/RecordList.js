import React from 'react'
import { connect } from 'react-redux'

import Record from './Record'

class RecordList extends React.Component {
  render() {
    const records = this.props.records.map((record, index) =>
      <Record key={index} record={record} />
    )

    return (
      <ul className="results-list results-list-border">
        { records }
      </ul>
    )
  }
}

RecordList.propTypes = {
  records: React.PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
    records: state.records
  }
}

export default connect(mapStateToProps)(RecordList);
