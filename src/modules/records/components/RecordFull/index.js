import React from 'react'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  withRouter
} from 'react-router-dom'

import {
  ShowAllList,
  TrimString,
} from '../../../core'
import ShowAdditionalFieldList from '../ShowAdditionalFieldList';
import {
  filterAccessFields,
  getField,
  getFieldValue,
  getFullRecordDisplayFields,
} from '../../utilities';
import {
  AccessItem,
} from '../AccessList'
import {
  ViewMARC,
  Holdings,
  RecordFullFormats,
  FullRecordPlaceholder
} from '../../../records'

import {
  requestRecord
} from '../../../pride';


class FullRecord extends React.Component {
  componentWillMount() {
    const { recordUid } = this.props.match.params
    const { datastoreUid } = this.props

    requestRecord({ recordUid, datastoreUid })
  }

  render() {
    const { record, institution, datastoreUid, datastores } = this.props;
    const { recordUid } = this.props.match.params

    if (!record) {
      return (
        <div className="container container-narrow">
          <FullRecordPlaceholder />
        </div>
      )
    }

    // Check if the record in state matches the record ID in the URL
    // If they don't match, then the new record is still being fetched.
    const recordUidValue = getFieldValue(getField(record.fields, 'id'))[0]
    if (recordUidValue !== recordUid) {
      return (
        <div className="container container-narrow">
          <FullRecordPlaceholder />
        </div>
      )
    }

    const access = filterAccessFields({
      fields: record.fields,
      type: 'access',
      datastore: datastoreUid,
    });

    const holdings = record.holdings

    const displayFields = getFullRecordDisplayFields({
      fields: record.fields,
      datastore: datastoreUid
    });

    const activeDatastore = _.findWhere(datastores.datastores, { uid: datastores.active })

    // Set page title
    document.title = `${record.names} · ${activeDatastore.name} record · Library Search`

    return (
      <div className="container container-narrow">
        <div className="full-record-container">
          <RecordFullFormats
            fields={record.fields}
            datastoreUid={datastoreUid}
          />
          <div className="record-container">
            <h1 className="full-record-title">
              {[].concat(record.names).map((title, index) => (
                <div key={index}>
                  <TrimString string={title} />
                </div>
              ))}
            </h1>

            <h3 className="full-record__record-info">Record Info</h3>
            <ShowAdditionalFieldList
              fields={displayFields}
              datastoreUid={datastoreUid}
              institution={institution}
            />

            {access.length > 0 && (
              <ShowAllList
                length={access.length}
                show={1}
                listClass={'access-list'}>
                {access.map((item, key) => (
                  <AccessItem key={key} type='full' item={item} />
                ))}
              </ShowAllList>
            )}
          </div>
          {holdings && (<Holdings holdings={holdings} />)}
        </div>

        {datastoreUid === 'mirlyn' && <ViewMARC record={record} />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    record: state.records.record,
    datastoreUid: state.datastores.active,
    datastores: state.datastores,
    institution: state.institution
  }
}

export default withRouter(connect(mapStateToProps)(FullRecord))
