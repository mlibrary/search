import React from 'react'
import { connect } from 'react-redux'

import { Loading } from '../../../core';
import FieldList from '../RecordFieldList';

/*
import {
  getField,
  filterDisplayFields
} from '../../utilities';
*/

class FullRecord extends React.Component {
  render() {
    const { record } = this.props;

    if (!record) {
      return (
        <div className="container container-narrow">
          <Loading />
        </div>
      )
    }

    return (
      <div className="container container-narrow">
        <div className="full-record-container">
          <h1 className="full-record-title">{record.names[0]}</h1>
          <FieldList fields={record.fields} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
  }
}

export default connect(mapStateToProps)(FullRecord)
