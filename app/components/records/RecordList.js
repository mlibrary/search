import React from 'react'
import { connect } from 'react-redux'

import Record from './Record'

import { fetchHoldings } from '../../actions/actions.js'

class RecordList extends React.Component {
  componentDidMount() {
    const { records } = this.props
    fetchHoldings(records)
  }

  render() {
    const records = this.props.records.map((record, index) =>
      <Record key={index} record={record} />
    )

    return (
      <ul className="results-list">
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
