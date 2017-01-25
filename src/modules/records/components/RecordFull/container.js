import React from 'react'
import { connect } from 'react-redux'
import { fetchPrideRecord } from '../../pride_interface.js'
import { store } from '../../store.js'
import { clearRecord } from '../../actions/index.js'
import { Link } from 'react-router';

import { getField } from '../../utilities/fields.js'

import Fields from './Fields.js';

class FullRecord extends React.Component {
  componentWillMount() {
    const params = this.props.params
    const datastore_uid = params.datastore_uid
    const record_uid = params.record_uid

    fetchPrideRecord(datastore_uid, record_uid)
  }

  render() {
    const params = this.props.params
    const record_uid = params.record_uid
    const active_datastore = this.props.active_datastore
    const record = this.props.record;

    if (!record) {
      return (
        <div className="container container-narrow">
          <div className="full-record-container">
            <p>Loading...</p>
          </div>
        </div>
      )
    }

    const fields = record.fields
    const id_field = getField(fields, 'id')

    // Checking to see if the stored record matches
    // the url record params
    if (id_field.value != record_uid) {
      return (
        <div className="container container-narrow">
          <div className="full-record-container">
            <p>Loading...</p>
          </div>
        </div>
      )
    }

    const name = record.names[0]

    return (
      <div className="container container-narrow">
        <div className="full-record-container">
          <h1 className="full-record-title">{name}</h1>
          <Fields fields={fields} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    active_datastore: state.datastores.active
  }
}

export default connect(mapStateToProps)(FullRecord)
