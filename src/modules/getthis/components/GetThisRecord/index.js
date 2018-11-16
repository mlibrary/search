import React from 'react'
import { connect } from 'react-redux';
import _ from 'underscore'

import {
  TrimString
} from '../../../core'
import {
  RecordFullFormats,
  RecordResourceAccess,
  FullRecordPlaceholder
} from '../../../records'

function GetThisHolding({ record, barcode }) {
  return (
    <div className="resource-access-container">
      <span>Holding with barcode <b>{barcode}</b> can not be rendered.</span>
    </div>
  )
}

class GetThisRecord extends React.Component {
  render() {
    const {
      record,
      datastoreUid,
      barcode
    } = this.props;

    if (!record) {
      return <FullRecordPlaceholder />
    }

    return (
      <div className="full-record-container u-margin-bottom-1">
        <RecordFullFormats
          fields={record.fields}
          datastoreUid={datastoreUid}
        />
        <div className="record-container">
          <h1 className="full-record-title u-margin-bottom-none">
            {[].concat(record.names).map((title, index) => (
              <div key={index}>
                <TrimString string={title} />
              </div>
            ))}
          </h1>
        </div>

        <GetThisHolding
          record={record}
          barcode={barcode}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
    searchQuery: state.router.location.search,
    institution: state.institution,
  };
}

export default connect(mapStateToProps)(GetThisRecord);
